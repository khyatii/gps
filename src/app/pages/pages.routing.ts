import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', },
      { path: 'dashboard2', loadChildren: './dashboard2/dashboard2.module#Dashboard2Module', },
      { path: 'access-management', loadChildren: './access-management/access-management.module#AccessManagementModule', },
      { path: 'access-module', loadChildren: './access-module/access-module.module#AccessModuleModule', },
      { path: 'update-profile', loadChildren: './updateprofile/updateprofile.module#UpdateprofileModule', },
      { path: 'users', loadChildren: './signup-user/signup-user.module#SignupUserModule', },
      { path: 'iwin', loadChildren: './iwin/iwin.module#IwinModule', },
      { path: 'view-goals', loadChildren: './view-goals/view-goals.module#ViewGoalsModule', },
      { path: 'hrm', loadChildren: './hrm/hrm.module#HrmModule', },
      { path: 'goalv2', loadChildren: './goalv2/goalv2.module#Goalv2Module', },
      { path: 'others', loadChildren: './others/others.module#OthersModule', },
      { path: 'roles', loadChildren: './roles/roles.module#RolesModule', },
      { path: 'broadcast', loadChildren: './broadcast/broadcast.module#BroadcastModule', },
      { path: 'signup-user', loadChildren: './signup-user/signup-user.module#SignupUserModule', },
      // { path: 'candidate-reference',loadChildren:'./candidate-reference/candidate-reference.module#CandidateReferenceModule'},
      { path: 'invite-candidiate',loadChildren:'./invite-candidiate/invite-candidiate.module#InviteCandidiateModule'},
      { path: 'view-reference',loadChildren:'./view-reference/view-reference.module#ViewReferenceModule'},
      { path: 'interview', loadChildren:'./interview/interview.module#InterviewModule'},
      { path: 'add-job', loadChildren:'./add-job/add-job.module#AddJobModule'},
      { path: 'view-jobs', loadChildren:'./view-jobs/view-jobs.module#ViewJobsModule'},
      { path: 'job-listings',loadChildren: './job-listings/job-listings.module#JobListingsModule'},
    ]
  },
];
export const PagesRouting: ModuleWithProviders = RouterModule.forChild(routes);

