import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData, Question } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  public appData: AppData;
  public filteredQuestions: Question[] = [];
  public dots = [];
  public currentIndex = 0;

  constructor(
    private _formatService: FormatService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.queryParams.subscribe((params) => {
      if (params['index']) {
        this.currentIndex = +params['index'];
      }
    });
    this.appData = this._formatService.appData;
    this.dots = Array(this.appData.steps);
    this._formatService.filteredQuestions.subscribe(
      (questions) => (this.filteredQuestions = questions)
    );
  }

  ngOnInit(): void {}

  getIfActive(index: number): boolean {
    let dotLength = this.dots.length;
    let ceil = Math.ceil(dotLength / 2);
    let totalQuestions = this.filteredQuestions.length;
    if (this.filteredQuestions.length - this.currentIndex < ceil) {
      return this.currentIndex + 1 == totalQuestions - dotLength + index + 1;
    }
    if (this.currentIndex + 1 > ceil) {
      return index + 1 == ceil;
    }
    return this.currentIndex == index;
  }

  stepClicked(index: number) {
    let dotLength = this.dots.length;
    let ceil = Math.ceil(dotLength / 2);
    if (this.currentIndex + 1 > ceil) {
      this._router.navigate(['question'], {
        queryParams: { index: this.currentIndex - ceil + index + 1 },
      });
      return;
    }
    this._router.navigate(['question'], { queryParams: { index } });
  }

  getLabel(index: number) {
    let dotLength = this.dots.length;
    let ceil = Math.ceil(dotLength / 2);
    if (this.filteredQuestions.length - this.currentIndex < ceil) {
      return this.filteredQuestions.length - dotLength + index + 1;
    }
    if (this.currentIndex + 1 > ceil) {
      return this.currentIndex - ceil + index + 2;
    }
    return index + 1;
  }
}
