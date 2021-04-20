import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'thank-you',
    loadChildren: () =>
      import(`./success/success.module`).then((m) => m.SuccessModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(`./console/console.module`).then((m) => m.ConsoleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
