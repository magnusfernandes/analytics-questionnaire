import { Component, OnInit } from '@angular/core';
import { AppData } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  public appData: AppData;

  constructor(private _formatService: FormatService) {
    this.appData = this._formatService.appData;
  }

  ngOnInit(): void {}
}
