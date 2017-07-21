import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedInGuard } from '../shared/guards/signed-in.guard';

import { SubmitComponent } from './submit/submit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'pwa',
    children: [{
      path: 'submit',
      component: SubmitComponent,
      canActivate: [SignedInGuard]
    }, {
      path: ':id',
      component: ViewComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PWARoutingModule { }
