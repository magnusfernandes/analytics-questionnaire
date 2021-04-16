export class Question {
  public section: string;
  public title: string;
  public type: string;
  public colors: string[];
  public options: QuestionOption[];

  constructor(data: any) {
    this.section = data.section ? data.section : null;
    this.title = data.title ? data.title : null;
    this.type = data.type ? data.type : null;
    this.colors = data.colors ? data.colors : [];
    this.options = data.options
      ? data.options.map((option: any) => new QuestionOption(option))
      : [];
  }
}

export class QuestionOption {
  public title: string;
  public colors: string[];

  constructor(data: any) {
    this.title = data.title ? data.title : null;
    this.colors = data.colors ? data.colors : [];
  }
}
