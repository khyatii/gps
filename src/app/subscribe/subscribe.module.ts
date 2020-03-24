import { SubscribeComponent } from './subscribe.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeRouting } from "./subscribe.routing";
import { SignupCompanyComponent } from './signup-company/signup-company.component';
@NgModule({
  imports: [
    CommonModule,SubscribeRouting,
  ],
  declarations: [SubscribeComponent,]
})
export class SubscribeModule { }
