import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedInGuard } from '../core/guards/signed-in.guard';
import { SignedOutGuard } from '../core/guards/signed-out.guard';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
