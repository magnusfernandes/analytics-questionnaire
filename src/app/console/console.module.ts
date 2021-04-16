import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsoleComponent } from './console.component';
import { IntroComponent } from './intro/intro.component';
import { QuestionComponent } from './question/question.component';

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
        pathMatch: 'full',
        component: IntroComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ConsoleComponent, IntroComponent, QuestionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ConsoleModule {}
