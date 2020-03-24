import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobComponent } from './add-job.component';
import { AddJobRoutingModule } from './add-job.routing';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';



@NgModule({
  imports: [
    CommonModule,
    AddJobRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  declarations: [AddJobComponent],
  providers: [CandidateRefService]
})
export class AddJobModule { }
