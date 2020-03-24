import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../common/routegaurd/authgaurd";
import { AccessManagementComponent } from './access-management.component';

const routes: Routes = [
    { path: '',component:AccessManagementComponent
},
];
export const AccessManagementRouting: ModuleWithProviders = RouterModule.forChild(routes);

