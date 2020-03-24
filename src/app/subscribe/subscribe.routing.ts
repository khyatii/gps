import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscribeComponent } from "./subscribe.component";

const routes: Routes = [
    { path: '',  component:SubscribeComponent,
    children:[
        { path: 'signup-company',loadChildren: './signup-company/signup-company.module#SignupCompanyModule',},
    ]
},
];
export const SubscribeRouting: ModuleWithProviders = RouterModule.forChild(routes);

