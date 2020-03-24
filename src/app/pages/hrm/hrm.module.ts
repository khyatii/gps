import { FiscalYearComponent } from './view-fiscal-year/fiscal-year/fiscal-year.component';
import { ModifyFiscalComponent } from './view-fiscal-year/modify-fiscal/modify-fiscal.component';
import { AddLeaveTypeComponent } from './leave-type/add-leave-type/add-leave-type.component';
import { ModifyLeaveTypeComponent } from './leave-type/modify-leave-type/modify-leave-type.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceComponent } from './attendance/attendance.component';
import { PageService } from './../../services/pages.service';
import { HrmService } from './../../services/hrm.service';
import { AuthGuard } from './../../common/routegaurd/authgaurd';
import { HrmRouting } from './hrm.routing';
import { HrmComponent } from './hrm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewFiscalYearComponent } from './view-fiscal-year/view-fiscal-year.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AddHolidaysComponent } from './holidays/add-holidays/add-holidays.component';
import { ModifyHolidaysComponent } from './holidays/modify-holidays/modify-holidays.component';
import { WeekDaysComponent } from './week-days/week-days.component';
import { AddWeekDaysComponent } from './week-days/add-week-days/add-week-days.component';
import { ModifyWeekDaysComponent } from './week-days/modify-week-days/modify-week-days.component';
import { EntitlementComponent } from './entitlement/entitlement.component';
import { AddEntitlementComponent } from './entitlement/add-entitlement/add-entitlement.component';
import { ModifyEntitlementComponent } from './entitlement/modify-entitlement/modify-entitlement.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';
import { ApplyLeavesComponent } from './leaves-list/apply-leaves/apply-leaves.component';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { AdminLeaveListComponent } from './admin-leave-list/admin-leave-list.component';
import { ViewAttendanceRecordsComponent } from './view-attendance-records/view-attendance-records.component';
import { AssignLeavesComponent } from './assign-leaves/assign-leaves.component';
import { ViewAdminAttendanceComponent } from './view-admin-attendance/view-admin-attendance.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
    HrmRouting, MyDatePickerModule, AngularMultiSelectModule, MyDateRangePickerModule, NgxPaginationModule
  ],
  declarations: [
    HrmComponent, AttendanceComponent, FiscalYearComponent, ViewFiscalYearComponent,
    LeaveTypeComponent, AddLeaveTypeComponent, ModifyFiscalComponent, ModifyLeaveTypeComponent,
    HolidaysComponent, AddHolidaysComponent, ModifyHolidaysComponent,
    WeekDaysComponent, AddWeekDaysComponent, ModifyWeekDaysComponent,
    EntitlementComponent, AddEntitlementComponent, ModifyEntitlementComponent,
    ApplyLeavesComponent, LeavesListComponent, AdminLeaveListComponent, ViewAttendanceRecordsComponent, AssignLeavesComponent, ViewAdminAttendanceComponent
  ],
  providers: [AuthGuard, HrmService, PageService]
})
export class HrmModule { }
