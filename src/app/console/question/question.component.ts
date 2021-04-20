import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { Answer, AppData, Question } from 'src/app/shared/models';
import { FormatService } from 'src/app/shared/services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @ViewChild('hiddenBtn', { static: false }) myHiddenBtn;

  public appData: AppData;
  public question: Question;
  public recordedAnswer: Answer;
  public questionNumber: number;
  public formReady = false;

  public questionForm: FormGroup;

  public initialSliderValue: number = 100;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 100,
  };

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
      if (this.questionNumber - 1 > this._formatService.getLastQuestion()) {
        this._router.navigate(['question'], {
          queryParams: { index: this.questionNumber - 1 },
        });
      }
      this.question = this._formatService.getQuestion(this.questionNumber);
      this.buildForm();
    });
  }

  ngOnInit(): void {}

  buildForm() {
    this.questionForm = this._fb.group({
      input: [
        {
          value: null,
          disabled: true,
        },
        Validators.required,
      ],
      checkboxes: this._fb.array([]),
      sliders: this._fb.array([]),
      radio: [
        {
          value: null,
          disabled: true,
        },
        Validators.required,
      ],
    });
    if (!this.question) {
      return;
    }

    switch (this.question.type) {
      case 'input':
        this.input.enable();
        break;
      case 'checkbox':
        this.initCheckboxes();
        break;
      case 'slider':
        this.initSliders();
        break;
      default:
        this.radio.enable();
        break;
    }
    this.formReady = true;
    this.getResponse();

    this.questionForm.valueChanges.subscribe((value) => {
      try {
        if (this.question.type == 'radio' && this.radio?.value != null) {
          this.continue(true);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  get radio(): FormControl {
    return this.questionForm.get('radio') as FormControl;
  }

  get input(): FormControl {
    return this.questionForm.get('input') as FormControl;
  }

  get sliders(): FormArray {
    return this.questionForm.get('sliders') as FormArray;
  }

  get checkboxes(): FormArray {
    return this.questionForm.get('checkboxes') as FormArray;
  }

  getResponse() {
    this.recordedAnswer = this._formatService.getResponseIfExists(
      this.questionNumber
    );
    if (this.recordedAnswer) {
      switch (this.question.type) {
        case 'input':
          this.input.patchValue(this.recordedAnswer.response);
          break;
        case 'checkbox':
          this.checkboxes.controls.map((control, index) => {
            control.patchValue(this.recordedAnswer.response[index]);
          });
          break;
        case 'slider':
          this.sliders.controls.map((control, index) => {
            control.patchValue(this.recordedAnswer.response[index]);
          });
          break;
        default:
          this.radio.patchValue(this.recordedAnswer.response);
          break;
      }
    }
  }

  continue(type: boolean) {
    let response: any;
    let colors: string[] = [];
    switch (this.question.type) {
      case 'input':
        response = this.input.value;
        break;
      case 'checkbox':
        response = this.checkboxes.value;
        break;
      case 'slider':
        if (
          !(
            this.getSliderTotal() >= this.question.sliderOptions.min &&
            this.getSliderTotal() <= this.question.sliderOptions.max
          )
        ) {
          this.myHiddenBtn.nativeElement.click();
          return;
        }
        response = this.sliders.value;
        break;
      default:
        response = this.radio.value;
        colors = this.question.options.find(
          (option, index) => index == response
        )?.colors;
        break;
    }
    this._formatService.recordAnswer(
      this.questionNumber,
      this.question.code,
      response,
      colors ? colors : []
    );
  }

  initCheckboxes() {
    this.question.options.map((option, index) => {
      this.checkboxes.push(this._fb.control(false, [Validators.required]));
    });
  }

  resetForm() {
    while (this.checkboxes.length > 0) {
      this.checkboxes.removeAt(0);
    }
    while (this.sliders.length > 0) {
      this.sliders.removeAt(0);
    }
  }

  initSliders() {
    this.question.options.map((option, index) => {
      this.sliders.push(this._fb.control(0, [Validators.required]));
    });
  }

  getSliderTotal() {
    let total = 0;
    this.sliders.controls.map((control) => (total += control.value));
    return total;
  }
}
