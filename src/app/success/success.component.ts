import { Component, OnInit } from '@angular/core';
import { FormatService } from '../shared/services';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  public formatId: string;

  constructor(private _formatService: FormatService) {
    this._formatService.formatId.subscribe(
      (formatId) => (this.formatId = formatId)
    );
  }

  ngOnInit(): void {}
}
