import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NgServiceWorker, ServiceWorkerModule } from '@angular/service-worker';
import * as firebase from 'firebase';

import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-pwa-app' }),
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    routing,
    ServiceWorkerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _sw: NgServiceWorker) {
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
}
