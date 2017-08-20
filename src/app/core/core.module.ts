import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgServiceWorker, ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NGMeta } from 'ngmeta';

import { environment } from '../../environments/environment';

import { UserService } from './services/user.service';
import { SubmitService } from './services/submit.service';
import { PWAService } from './services/pwa.service';
import { SignedInGuard } from './guards/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ServiceWorkerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    NGMeta,
    UserService,
    SubmitService,
    PWAService,
    SignedInGuard,
    SignedOutGuard
  ],
})
export class CoreModule {
  constructor(private _sw: NgServiceWorker, private _us: UserService) {
    if (environment.applicationServerKey) {
      this._sw.registerForPush({
        applicationServerKey: environment.applicationServerKey
      }).subscribe((sub: any) => {
        // Use details to register on your server to send notifications to this device
        console.log(sub);
      });
      this._sw.push.subscribe((msg: any) => {
        // Handle message when in app
        console.log(msg);
      });
    }
  }

  static forRoot(): ModuleWithProviders {
    return { ngModule: CoreModule };
  }
}
