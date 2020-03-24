import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListingsComponent } from './job-listings.component';
import { JobListingsRoutingModule } from './job-listings.routing';
import { CandidateRefService } from '../../services/candidate-ref.service';


@NgModule({
  imports: [
    CommonModule,
    JobListingsRoutingModule
  ],
  declarations: [JobListingsComponent],
  providers: [CandidateRefService]
})
export class JobListingsModule { }
