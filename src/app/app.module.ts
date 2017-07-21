import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
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
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
