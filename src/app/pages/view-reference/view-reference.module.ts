import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewReferenceRoutingModule } from './view-reference-routing.module';
import { ViewReferenceComponent } from './view-reference.component';
import { CandidateRefService } from './../../services/candidate-ref.service';
import { ProceedCandidRefComponent } from './proceed-candid-ref/proceed-candid-ref.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { CandidateRatingsComponent } from './candidate-ratings/candidate-ratings.component';

@NgModule({
  imports: [
    CommonModule,
    ViewReferenceRoutingModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  declarations: [ViewReferenceComponent, ProceedCandidRefComponent, CandidateRatingsComponent],
  providers:[CandidateRefService,AmazingTimePickerService]
})
export class ViewReferenceModule { }
