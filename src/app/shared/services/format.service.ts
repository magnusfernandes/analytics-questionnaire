import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Answer, AppData, Question } from '../models';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  recordedAnswers: Answer[] = [];
  recordedSections: string[] = [];
  selectedColors: string[] = [];

  public startTime = new Date();
  public instance = uuidv4();
  public filteredQuestions: BehaviorSubject<Question[]> = new BehaviorSubject(
    []
  );
  public appData: BehaviorSubject<AppData> = new BehaviorSubject(null);
  public formatId: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private _router: Router, private _mainService: MainService) {}

  async importFile(format: string) {
    this.appData.next(
      new AppData((await import(`../data/${format}.json`)).default)
    );
    this.filteredQuestions.next(this.appData.value.questions);
  }

  getQuestion(index: number) {
    if (index > this.filteredQuestions.value.length) {
      return;
    }
    return this.filteredQuestions.value[index];
  }

  getResponseIfExists(index: number): Answer {
    return this.recordedAnswers.find(
      (record) => record.questionNumber == index
    );
  }

  recordAnswer(
    questionNumber: number,
    code: string,
    response: any,
    others: any,
    colors: string[]
  ) {
    let time = this.startTime.getTime() - new Date().getTime();
    let answer = new Answer({
      questionCode: code,
      questionNumber,
      response,
      others,
      seconds: Math.abs(time / 1000),
      colors,
    });
    let existing = this.recordedAnswers.find(
      (record) => record.questionCode == answer.questionCode
    );
    if (existing) {
      let newAnswers: Answer[] = [];
      let newColors: string[] = [];
      for (let i = 0; i < this.recordedAnswers.length; i++) {
        let recordedAnswer = this.recordedAnswers[i];
        if (recordedAnswer.questionNumber == answer.questionNumber) {
          this.selectedColors = [];
          for (let j = 0; j < newColors.length; j++) {
            if (!this.selectedColors.includes(newColors[j])) {
              this.selectedColors.push(newColors[j]);
            }
          }
          this.recordedAnswers = newAnswers;
          newAnswers.push(answer);
          this.filterQuestions();
          this._router.navigate(['research', this.formatId.value, 'question'], {
            queryParams: { index: questionNumber + 1 },
          });
          break;
        }
        newColors = [...newColors, ...this.recordedAnswers[i].colors];
        newAnswers.push(recordedAnswer);
      }
    } else {
      this.recordedAnswers.push(answer);
      if (questionNumber < this.filteredQuestions.value.length) {
        this._router.navigate(['research', this.formatId.value, 'question'], {
          queryParams: { index: questionNumber + 1 },
        });
      }
    }
    colors.map((color) =>
      this.selectedColors.includes(color)
        ? null
        : this.selectedColors.push(color)
    );
    if (
      this.recordedSections.length == 0 ||
      this.recordedSections.length >
        this.filteredQuestions.value.filter((question) =>
          this.recordedSections.includes(question.section) ? question : null
        ).length
    ) {
      this.recordedSections.push(
        this.filteredQuestions.value[questionNumber].section
      );
    }
    this.filterQuestions();
    if (this.filteredQuestions.value.length == this.recordedAnswers.length) {
      this.saveData(true);
      return;
    }
    if (this.isEndOfSection()) {
      this.saveData();
      if (this.filteredQuestions.value[questionNumber + 1]) {
        this.recordedSections.push(
          this.filteredQuestions.value[questionNumber + 1].section
        );
      }
    }
  }

  isEndOfSection(): boolean {
    if (this.recordedSections.length == 0) {
      return false;
    }
    if (
      this.recordedAnswers.length ==
      this.filteredQuestions.value.filter((question) =>
        this.recordedSections.includes(question.section) ? question : null
      ).length
    ) {
      return true;
    }
    return false;
  }

  filterQuestions() {
    let filtered = [];
    this.appData.value.questions.map((question) => {
      if (question.colors.length == 0) {
        filtered.push(question);
      }
      question.colors.map((color) => {
        if (this.selectedColors.includes(color)) {
          filtered.push(question);
        }
      });
    });
    this.filteredQuestions.next(filtered);
  }

  getLastQuestion() {
    let high = 0;
    if (this.recordedAnswers.length == 0) {
      return -1;
    }
    this.recordedAnswers.map((answer) =>
      high < answer.questionNumber ? (high = answer.questionNumber) : null
    );
    return high;
  }

  saveData(isLast?: boolean) {
    let finalData = [];
    this.appData.value.questions.map((question, index) => {
      let answer = this.recordedAnswers.find(
        (item) => item.questionCode == question.code
      );
      if (answer) {
        answer.questionNumber = index;
      } else {
        answer = new Answer({});
        answer.questionCode = question.code;
        answer.questionNumber = index;
        answer.response = null;
      }
      let data: any = {
        question: this.appData.value.questions[answer.questionNumber].title,
        time: answer.seconds,
      };
      if (answer.response != null) {
        switch (this.appData.value.questions[answer.questionNumber].type) {
          case 'checkbox':
            data.response = [];
            answer.response?.map((item, index) =>
              item
                ? data.response.push(
                    this.appData.value.questions[answer.questionNumber].options[
                      index
                    ].title
                  )
                : null
            );
            break;
          case 'radio':
            data.response = this.appData.value.questions[
              answer.questionNumber
            ].options[answer.response].title;
            break;
          default:
            data.response = answer.response;
            break;
        }
      }
      finalData.push(data);
    });
    this._mainService.publishData({
      id: this.instance,
      test: this.formatId.value,
      version: this.appData.value.version,
      data: finalData,
    });
    if (isLast) {
      this.recordedAnswers = [];
      this._router.navigate(['thank-you']);
    }
  }
}
