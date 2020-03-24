import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../../common/routegaurd/authgaurd";

const routes: Routes = [
    { path: '',component:DashboardComponent
},
];
export const DashboradRouting: ModuleWithProviders = RouterModule.forChild(routes);

