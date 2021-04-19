import { v4 as uuidv4 } from 'uuid';

import { Options } from '@angular-slider/ngx-slider';

export class Question {
  public code: string;
  public section: string;
  public title: string;
  public alignment: 'vertical' | 'horizontal';
  public type: 'radio' | 'checkbox' | 'slider' | 'input';
  public colors: string[];
  public options: QuestionOption[];
  public sliderTotal: number;

  constructor(data: any) {
    this.code = data.code ? data.code : uuidv4();
    this.section = data.section ? data.section : null;
    this.title = data.title ? data.title : null;
    this.alignment = data.alignment ? data.alignment : 'vertical';
    this.type = data.type ? data.type : null;
    this.sliderTotal = data.sliderTotal != null ? data.sliderTotal : null;
    this.colors = data.colors ? data.colors : [];
    this.options = data.options
      ? data.options.map((option: any) => new QuestionOption(option))
      : [];
  }
}

export class QuestionOption {
  public title: string;
  public colors: string[];
  public config: SliderConfig;

  constructor(data: any) {
    this.title = data.title ? data.title : null;
    this.colors = data.colors ? data.colors : [];
    this.config = data.config
      ? new SliderConfig(data.config)
      : new SliderConfig({});
  }
}

export class Answer {
  public questionCode: string;
  public questionNumber: number;
  public response: any;

  constructor(data: any) {
    this.questionNumber =
      data.questionNumber != null ? data.questionNumber : null;
    this.questionCode = data.questionCode != null ? data.questionCode : null;
    this.response = data.response != null ? data.response : null;
  }
}

export class SliderConfig {
  public initialValue: number;
  public options: Options;

  constructor(data: any) {
    this.initialValue = data.initialValue != null ? data.initialValue : null;

    let options = new Options();
    options.floor = data.options?.floor != null ? data.options.floor : 0;
    options.ceil = data.options?.ceil != null ? data.options.ceil : 100;
    this.options = options;
  }
}
