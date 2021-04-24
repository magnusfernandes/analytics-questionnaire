import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'thank-you',
    loadChildren: () =>
      import(`./success/success.module`).then((m) => m.SuccessModule),
  },
  {
    path: 'submissions/:userId',
    loadChildren: () =>
      import(`./submissions/submissions.module`).then(
        (m) => m.SubmissionsModule
      ),
  },
  {
    path: 'research/:formatId',
    loadChildren: () =>
      import(`./console/console.module`).then((m) => m.ConsoleModule),
  },
  {
    path: '',
    redirectTo: 'thank-you',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
