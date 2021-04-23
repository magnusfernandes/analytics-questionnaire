import { v4 as uuidv4 } from 'uuid';

import { Options } from '@angular-slider/ngx-slider';

export class Question {
  public code: string;
  public section: string;
  public title: string;
  public subTitle: string;
  public alignment: 'vertical' | 'horizontal';
  public type: 'radio' | 'checkbox' | 'slider' | 'input' | 'scale';
  public items: any[];
  public labels: string[];
  public colors: string[];
  public options: QuestionOption[];
  public sliderOptions: SliderOptions;

  constructor(data: any) {
    this.code = data.code ? data.code : uuidv4();
    this.section = data.section ? data.section : null;
    this.title = data.title ? data.title : null;
    this.subTitle = data.subTitle ? data.subTitle : null;
    this.alignment = data.alignment ? data.alignment : 'vertical';
    this.type = data.type ? data.type : null;
    this.sliderOptions =
      data.sliderOptions != null
        ? new SliderOptions(data.sliderOptions)
        : new SliderOptions({});
    this.items = data.items ? data.items : [];
    this.labels = data.labels ? data.labels : [];
    this.colors = data.colors ? data.colors : [];
    this.options = data.options
      ? data.options.map((option: any) => new QuestionOption(option))
      : [];
  }

  ifOthersExists(): boolean {
    if (this.type != 'radio' && this.type != 'checkbox') {
      return false;
    }
    if (this.options.find((item) => item.title.toLowerCase() == 'others')) {
      return true;
    }
    return false;
  }

  showSubmit(): boolean {
    if (this.type == 'radio' && this.ifOthersExists()) {
      return true;
    }
    if (this.type == 'radio' || this.type == 'scale') {
      return false;
    }
    return true;
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
  public others: any;
  public seconds: number;
  public colors: string[];

  constructor(data: any) {
    this.questionNumber =
      data.questionNumber != null ? data.questionNumber : null;
    this.questionCode = data.questionCode != null ? data.questionCode : null;
    this.response = data.response != null ? data.response : null;
    this.others = data.others != null ? data.others : null;
    this.seconds = data.seconds != null ? data.seconds : null;
    this.colors = data.colors ? data.colors : [];
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

export class SliderOptions {
  public min: number;
  public max: number;

  constructor(data: any) {
    this.min = data.min != null ? data.min : null;
    this.max = data.max != null ? data.max : null;
  }
}
