import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { DashboradRouting } from "./dashboard.routing";
import { DashboardStatusComponent } from './dashboard-status/dashboard-status.component';
import { DashboardCommentsComponent } from './dashboard-comments/dashboard-comments.component';
import { DashboardQuickActionsComponent } from './dashboard-quick-actions/dashboard-quick-actions.component';
import { DashboardCommentsApprovedComponent } from './dashboard-comments-approved/dashboard-comments-approved.component';
import { DashboardCommentsPendingComponent } from './dashboard-comments-pending/dashboard-comments-pending.component';
import { DashboardQuickActionsCompletedComponent } from './dashboard-quick-actions-completed/dashboard-quick-actions-completed.component';
import { DashboardQuickActionsPendingComponent } from './dashboard-quick-actions-pending/dashboard-quick-actions-pending.component';
import { AuthGuard } from "../../common/routegaurd/authgaurd";

@NgModule({
  imports: [
    CommonModule,DashboradRouting
  ],
  declarations: [DashboardComponent, DashboardStatusComponent, DashboardCommentsComponent, DashboardQuickActionsComponent, DashboardCommentsApprovedComponent, DashboardCommentsPendingComponent, DashboardQuickActionsCompletedComponent, DashboardQuickActionsPendingComponent],
  
})
export class DashboardModule { }
