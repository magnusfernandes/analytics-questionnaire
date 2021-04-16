import { Component, OnInit } from '@angular/core';

import { AppData } from '../shared/models';
import { FormatService } from '../shared/services';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  public appData: AppData;

  constructor(private _formatService: FormatService) {
    this.appData = this._formatService.appData;
  }

  ngOnInit(): void {}
}
