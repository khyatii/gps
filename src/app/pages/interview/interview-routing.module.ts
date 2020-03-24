import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewComponent } from './interview.component';
import { CandidateRatingsComponent } from './candidate-ratings/candidate-ratings.component';


const routes: Routes = [
  { path: '', component: InterviewComponent },
  { path:'rateCandidate/:id',component:CandidateRatingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InterviewRoutingModule { }
