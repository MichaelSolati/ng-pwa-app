import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedInGuard } from '../shared/guards/signed-in.guard';

import { SubmitComponent } from './submit/submit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'submit',
    component: SubmitComponent,
    canActivate: [SignedInGuard]
  }, {
    path: ':id',
    component: ViewComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
