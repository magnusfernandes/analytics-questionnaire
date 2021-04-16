import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Answer, AppData } from '../shared/models';
import { FormatService } from '../shared/services';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  faCheck = faCheck;
  public appData: AppData;
  public questionNumber: number;

  constructor(private _formatService: FormatService) {
    this.appData = this._formatService.appData;
  }

  ngOnInit(): void {}

  getResponse(index: number): Answer {
    return this._formatService.getResponseIfExists(index);
  }
}
