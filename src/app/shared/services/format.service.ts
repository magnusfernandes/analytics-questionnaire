import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as data from '../data/format.json';
import { Answer, AppData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  recordedAnswers: Answer[] = [];

  appData = new AppData((data as any).default);

  constructor(private _router: Router) {
    console.log(this.appData);
  }

  getQuestion(index: number) {
    if (index > this.appData.questions.length) {
      return;
    }
    return this.appData.questions[index];
  }

  getResponseIfExists(index: number): Answer {
    return this.recordedAnswers.find(
      (record) => record.questionNumber == index
    );
  }

  recordAnswer(questionNumber: number, response: any) {
    let answer = new Answer({
      questionNumber,
      response,
    });
    let existing = this.recordedAnswers.find(
      (record) => record.questionNumber == answer.questionNumber
    );
    if (existing) {
      this.recordedAnswers = this.recordedAnswers.map((record) =>
        record.questionNumber == answer.questionNumber ? answer : record
      );
      if (questionNumber < this.appData.questions.length) {
        this._router.navigate(['question'], {
          queryParams: { index: questionNumber + 1 },
        });
      }
    } else {
      this.recordedAnswers.push(answer);
    }
  }
}
