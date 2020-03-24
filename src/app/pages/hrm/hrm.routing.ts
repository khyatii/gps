import { ViewAdminAttendanceComponent } from './view-admin-attendance/view-admin-attendance.component';
import { AssignLeavesComponent } from './assign-leaves/assign-leaves.component';
import { ViewAttendanceRecordsComponent } from './view-attendance-records/view-attendance-records.component';
import { AdminLeaveListComponent } from './admin-leave-list/admin-leave-list.component';
import { ModifyFiscalComponent } from './view-fiscal-year/modify-fiscal/modify-fiscal.component';
import { FiscalYearComponent } from './view-fiscal-year/fiscal-year/fiscal-year.component';
import { ModifyLeaveTypeComponent } from './leave-type/modify-leave-type/modify-leave-type.component';
import { AddLeaveTypeComponent } from './leave-type/add-leave-type/add-leave-type.component';
import { ApplyLeavesComponent } from './leaves-list/apply-leaves/apply-leaves.component';
import { ModifyEntitlementComponent } from './entitlement/modify-entitlement/modify-entitlement.component';
import { AddEntitlementComponent } from './entitlement/add-entitlement/add-entitlement.component';
import { EntitlementComponent } from './entitlement/entitlement.component';
import { ModifyWeekDaysComponent } from './week-days/modify-week-days/modify-week-days.component';
import { AddWeekDaysComponent } from './week-days/add-week-days/add-week-days.component';
import { WeekDaysComponent } from './week-days/week-days.component';
import { AddHolidaysComponent } from './holidays/add-holidays/add-holidays.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFiscalYearComponent } from './view-fiscal-year/view-fiscal-year.component';
import { ModifyHolidaysComponent } from './holidays/modify-holidays/modify-holidays.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';

const routes: Routes = [
    // {
    //     path: '', component: HrmComponent,
    //     children: [
    //         { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule', },
    //     ]
    // },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'fiscal-year', component: FiscalYearComponent },
    { path: 'modify-fiscal', component: ModifyFiscalComponent },
    { path: 'view-fiscal-year', component: ViewFiscalYearComponent },
    { path: 'leave-type', component: LeaveTypeComponent },
    { path: 'add-leave-type', component: AddLeaveTypeComponent },
    { path: 'modifyLeaveType', component: ModifyLeaveTypeComponent },
    { path: 'holidays', component: HolidaysComponent },
    { path: 'addHolidays', component: AddHolidaysComponent },
    { path: 'modifyHolidays', component: ModifyHolidaysComponent },
    { path: 'week-days', component: WeekDaysComponent },
    { path: 'addWeekDays', component: AddWeekDaysComponent },
    { path: 'modifyWeekDays', component: ModifyWeekDaysComponent },
    { path: 'entitlement', component: EntitlementComponent },
    { path: 'addEntitlement', component: AddEntitlementComponent },
    { path: 'modifyEntitlement', component: ModifyEntitlementComponent },
    { path: 'leaves-list', component: LeavesListComponent },
    { path: 'applyLeaves', component: ApplyLeavesComponent },
    { path: 'adminLeaveList', component: AdminLeaveListComponent },
    { path: 'viewAttendanceRecord', component: ViewAttendanceRecordsComponent },
    { path: 'assign-leaves', component: AssignLeavesComponent },
    { path: 'viewAdminAttendance', component: ViewAdminAttendanceComponent },


];
export const HrmRouting: ModuleWithProviders = RouterModule.forChild(routes);

