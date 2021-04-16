import { Question } from './question.model';

export class AppData {
  public title: string;
  public introduction: string;
  public questions: Question[];

  constructor(data: any) {
    this.title = data.title ? data.title : null;
    this.introduction = data.introduction ? data.introduction : null;
    this.questions = data.questions
      ? data.questions.map((question: any) => new Question(question))
      : [];
  }
}
