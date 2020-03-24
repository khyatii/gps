import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateprofileComponent } from './updateprofile.component';
import { UpdateprofileRouting } from './updateprofile.routing';
@NgModule({
  imports: [
    CommonModule,UpdateprofileRouting
  ],
  declarations: [UpdateprofileComponent,]
})
export class UpdateprofileModule { }
