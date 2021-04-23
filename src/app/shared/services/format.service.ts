import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import * as data from '../data/new-format.json';
import { Answer, AppData, Question } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  recordedAnswers: Answer[] = [];
  recordedSections: string[] = [];
  selectedColors: string[] = [];

  appData = new AppData((data as any).default);

  public startTime = new Date();
  public filteredQuestions: BehaviorSubject<Question[]> = new BehaviorSubject(
    this.appData.questions
  );

  constructor(private _router: Router) {}

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
          this._router.navigate(['question'], {
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
        this._router.navigate(['question'], {
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
    this.appData.questions.map((question) => {
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
    this.appData.questions.map((question, index) => {
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
      finalData.push(answer);
    });
    console.table(finalData);
    if (isLast) {
      this.recordedAnswers = [];
      this._router.navigate(['thank-you']);
    }
  }
}
