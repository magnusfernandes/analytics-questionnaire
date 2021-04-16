import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './console.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    data: {
      title: 'Analytics Station',
    },
  },
];

@NgModule({
  declarations: [ConsoleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ConsoleModule {}
