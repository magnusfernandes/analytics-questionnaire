import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData, Question } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public appData: AppData;
  public question: Question;
  public questionNumber: number;

  public questionForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formatService: FormatService,
    private _fb: FormBuilder
  ) {
    this._route.queryParams.subscribe((params) => {
      if (!params['index']) {
        this._router.navigate(['question'], { queryParams: { index: 0 } });
      }
      this.questionForm ? this.questionForm.reset() : null;
      this.questionNumber = +params['index'];
      this.question = this._formatService.getQuestion(this.questionNumber);
    });
  }

  ngOnInit(): void {
    this.questionForm = this._fb.group({
      question: [null, Validators.required],
    });
  }

  buildForm() {}

  continue() {
    this._formatService.recordAnswer(
      this.questionNumber,
      this.questionForm.value
    );
  }
}
