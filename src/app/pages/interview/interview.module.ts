import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewComponent } from './interview.component';
import { CandidateRefService } from './../../services/candidate-ref.service';
import { CandidateRatingsComponent } from './candidate-ratings/candidate-ratings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    InterviewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InterviewComponent, CandidateRatingsComponent],
  providers:[CandidateRefService]
})

export class InterviewModule { }
