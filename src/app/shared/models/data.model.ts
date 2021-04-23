import { Question } from './question.model';

export class AppData {
  public heading: string;
  public title: string;
  public logo: string;
  public version: number;
  public steps: number;
  public introduction: string;
  public questions: Question[];

  constructor(data: any) {
    this.heading = data.heading ? data.heading : null;
    this.title = data.title ? data.title : null;
    this.logo = data.logo ? data.logo : null;
    this.steps = data.steps ? data.steps : 0;
    this.version = data.version ? data.version : null;
    this.introduction = data.introduction ? data.introduction : null;
    this.questions = data.questions
      ? data.questions.map((question: any) => new Question(question))
      : [];
  }
}
