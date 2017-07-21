import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { routing } from './account-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    routing
  ],
  declarations: [
    SignInComponent,
    ProfileComponent
  ]
})
export class AccountModule { }
