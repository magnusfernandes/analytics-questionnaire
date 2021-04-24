import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../shared/services';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss'],
})
export class SubmissionsComponent implements OnInit {
  public userId: string;
  public data: any;

  constructor(
    private _route: ActivatedRoute,
    private _mainService: MainService
  ) {
    this._mainService.data.subscribe((data) => (this.data = data));
    this.userId = this._route.snapshot.params['userId'];
    if (this.userId) {
      this.fetchData();
    }
  }

  ngOnInit(): void {}

  fetchData() {
    this._mainService.fetchData(this.userId);
  }
}
