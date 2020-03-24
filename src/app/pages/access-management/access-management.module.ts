import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessManagementComponent } from './access-management.component';
import { AccessManagementRouting } from './access-management.routing';

@NgModule({
  imports: [
    CommonModule,AccessManagementRouting,FormsModule,ReactiveFormsModule
  ],
  declarations: [ AccessManagementComponent ]
})
export class AccessManagementModule { 
  
}
