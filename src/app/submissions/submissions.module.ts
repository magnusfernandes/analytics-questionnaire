import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionsComponent } from './submissions.component';

const routes: Routes = [
  {
    path: '',
    component: SubmissionsComponent,
  },
];

@NgModule({
  declarations: [SubmissionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SubmissionsModule {}
