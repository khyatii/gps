import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReferenceComponent } from './view-reference.component';
import { ProceedCandidRefComponent } from './proceed-candid-ref/proceed-candid-ref.component';
import { CandidateRatingsComponent } from './candidate-ratings/candidate-ratings.component'

const routes: Routes = [
  { path: '', component: ViewReferenceComponent },
  { path:'proceedRefid/:id',component:ProceedCandidRefComponent },
  { path:'candidateRatings/:id',component:CandidateRatingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ViewReferenceRoutingModule { }