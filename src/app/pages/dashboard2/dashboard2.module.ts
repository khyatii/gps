import { StopwatchService } from './goaltable/stopwatchservice';
import { CommonModule } from '@angular/common';
import { Dashboard2Component } from "./dashboard2.component";
import { Dashborad2Routing } from "./dashboard2.routing";
import { AuthGuard } from "../../common/routegaurd/authgaurd";
import { NgModule } from "@angular/core";
import { GoaltableComponent } from './goaltable/goaltable.component';
import { GoalrowComponent } from './goalrow/goalrow.component';
import { BsDatepickerModule } from "ngx-bootstrap";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';
import { BrowserModule } from '@angular/platform-browser';
import { IncompletegoalsComponent } from './incompletegoals/incompletegoals.component';
@NgModule({
  imports: [
    CommonModule,Dashborad2Routing,BsDatepickerModule.forRoot(),MyDatePickerModule,ReactiveFormsModule, FormsModule
  ],
  declarations: [Dashboard2Component, GoaltableComponent, GoalrowComponent, IncompletegoalsComponent,],
  providers:[AuthGuard,StopwatchService,GoalService]
})
export class Dashboard2Module { }
