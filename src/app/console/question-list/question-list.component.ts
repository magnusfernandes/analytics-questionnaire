import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Answer, AppData } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  faCheck = faCheck;
  public appData: AppData;

  constructor(private _formatService: FormatService) {
    this.appData = this._formatService.appData;
  }

  ngOnInit(): void {}

  getResponse(index: number): Answer {
    return this._formatService.getResponseIfExists(index);
  }
}
