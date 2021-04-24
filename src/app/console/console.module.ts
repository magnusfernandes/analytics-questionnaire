import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { ConsoleComponent } from './console.component';
import { IntroComponent } from './intro/intro.component';
import { QuestionComponent } from './question/question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    data: {
      title: 'Analytics Station',
    },
    children: [
      {
        path: 'question',
        component: QuestionComponent,
      },
      {
        path: '',
        component: IntroComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ConsoleComponent,
    IntroComponent,
    QuestionComponent,
    QuestionListComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    FontAwesomeModule,
  ],
})
export class ConsoleModule {}
