import { SetPasswordComponent } from './set-password/set-password.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login.component";
import { LoginGaurd } from '../common/routegaurd/logingaurd';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'setPassword', component: SetPasswordComponent },
];
export const LoginRouting: ModuleWithProviders = RouterModule.forChild(routes);

