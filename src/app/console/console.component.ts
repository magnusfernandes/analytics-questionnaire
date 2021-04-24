import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppData } from '../shared/models';
import { FormatService } from '../shared/services';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  public appData: AppData;
  public formatId: string;

  constructor(
    private _formatService: FormatService,
    private _route: ActivatedRoute
  ) {
    this._formatService.appData.subscribe((data) => (this.appData = data));
    this._formatService.formatId.subscribe(
      (formatId) => (this.formatId = formatId)
    );
    this._route.params.subscribe((params) => {
      this._formatService.formatId.next(params['formatId']);
      this._formatService.importFile(this.formatId);
    });
  }

  ngOnInit(): void {}
}
