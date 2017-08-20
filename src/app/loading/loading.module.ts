import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { LoadingRoutingModule } from './loading-routing.module';

import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LoadingRoutingModule
  ],
  declarations: [
    LoadingComponent
  ]
})
export class LoadingModule { }
