import { ViewUsersComponent } from './view-users/view-users.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupUserComponent } from "./signup-user.component";
import { SendInvitationComponent } from './send-invitation/send-invitation.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
    { path: '', component: ViewUsersComponent },
    { path: 'add-user', component: SignupUserComponent },
    { path: 'send-invitation', component: SendInvitationComponent },
    { path: 'update-user', component: UpdateUserComponent },
];
export const SignupUserRouting: ModuleWithProviders = RouterModule.forChild(routes);

