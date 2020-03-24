import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Goalv2RoutingModule } from './goalv2-routing.module';
import { Goalv2Component } from './goalv2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    Goalv2RoutingModule,FormsModule,ReactiveFormsModule,BsDatepickerModule.forRoot()
  ],
  declarations: [Goalv2Component]
})
export class Goalv2Module { }
