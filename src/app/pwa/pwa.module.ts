import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PWARoutingModule } from './pwa-routing.module';

import { SubmitComponent } from './submit/submit.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PWARoutingModule
  ],
  declarations: [
    SubmitComponent,
    ViewComponent
  ]
})
export class PWAModule { }
