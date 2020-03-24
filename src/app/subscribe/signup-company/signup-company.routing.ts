import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupCompanyComponent } from "./signup-company.component";

const routes: Routes = [
    { path: '',  component:SignupCompanyComponent
},
];
export const SignupCompanyRouting: ModuleWithProviders = RouterModule.forChild(routes);

