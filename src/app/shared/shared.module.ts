import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NGMeta } from 'ngmeta';

import { UserService } from './services/user.service';
import { SubmitService } from './services/submit.service';
import { PWAService } from './services/pwa.service';
import { SignedInGuard } from './guards/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out.guard';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    NGMeta,
    UserService,
    SubmitService,
    PWAService,
    SignedInGuard,
    SignedOutGuard
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule {
  constructor(private _us: UserService) { }

  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
