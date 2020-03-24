import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';


const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'profileDetail', component: ProfileDetailsComponent },

];
export const UserComponentRouting: ModuleWithProviders = RouterModule.forChild(routes);

