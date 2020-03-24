import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListingsComponent } from './job-listings.component';

const routes: Routes = [
  { path: '', component: JobListingsComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobListingsRoutingModule { }