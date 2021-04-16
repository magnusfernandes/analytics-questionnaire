import { Injectable } from '@angular/core';

import * as data from '../data/format.json';
import { AppData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  appData = new AppData((data as any).default);

  constructor() {}

  getQuestion(index: number) {
    if (index > this.appData.questions.length) {
      return;
    }
    return this.appData.questions[index];
  }

  recordAnswer(question: number, answer: any) {
    console.log(question, answer);
  }
}
