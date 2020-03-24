import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobsComponent } from './view-jobs.component';
import { ViewJobsRoutingModule } from './view-jobs.routing'
import { CandidateRefService } from '../../services/candidate-ref.service';

@NgModule({
  imports: [
    CommonModule,
    ViewJobsRoutingModule
  ],
  declarations: [ViewJobsComponent],
  providers: [CandidateRefService]
})
export class ViewJobsModule { }
