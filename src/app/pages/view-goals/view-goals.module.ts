import { CommonModule } from '@angular/common';
import { ViewGoalsComponent } from "./view-goals.component";
import { ViewGoalsRouting } from "./view-goals.routing";
import { AuthGuard } from "../../common/routegaurd/authgaurd";
import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';

@NgModule({
    imports: [
        CommonModule, ViewGoalsRouting, MyDatePickerModule, MyDateRangePickerModule,
        BsDatepickerModule.forRoot(), ReactiveFormsModule, FormsModule
    ],
    declarations: [ViewGoalsComponent],
    providers: [AuthGuard, GoalService]
})
export class ViewGoalsModule { }
