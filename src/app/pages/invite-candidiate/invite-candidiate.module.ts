import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteCandidiateRoutingModule } from './invite-candidiate-routing.module';
import { InviteCandidiateComponent } from './invite-candidiate.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InviteCandidiateRoutingModule,ReactiveFormsModule
  ],
  declarations: [InviteCandidiateComponent]
})
export class InviteCandidiateModule { }
