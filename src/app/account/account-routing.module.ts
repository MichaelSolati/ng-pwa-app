import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedInGuard } from '../shared/guards/signed-in.guard';
import { SignedOutGuard } from '../shared/guards/signed-out.guard';

import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [SignedInGuard]
  }, {
    path: 'sign-in',
    component: SignInComponent,
    pathMatch: 'full',
    canActivate: [SignedOutGuard]
  }, {
    path: '**',
    redirectTo: '/'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
