import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccessModuleRoutingModule } from './access-module-routing.module';
import { AccessModuleComponent } from './access-module.component';

@NgModule({
  imports: [
    CommonModule,
    AccessModuleRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [AccessModuleComponent]
})
export class AccessModuleModule { }
