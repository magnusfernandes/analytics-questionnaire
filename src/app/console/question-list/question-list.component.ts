import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Answer, AppData, Question } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  faCheck = faCheck;
  public questions: Question[];

  constructor(private _formatService: FormatService) {
    this._formatService.filteredQuestions.subscribe(
      (questions) => (this.questions = questions)
    );
  }

  ngOnInit(): void {}

  getResponse(index: number): Answer {
    return this._formatService.getResponseIfExists(index);
  }

  showQuestion(index: number) {
    if (index - 1 > this._formatService.getLastQuestion()) {
      return false;
    }
    return true;
  }
}
