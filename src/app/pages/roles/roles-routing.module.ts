import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { ModifyRoleComponent } from './modify-role/modify-role.component';

const routes: Routes = [
  { path: '',component:RolesComponent},
  { path: 'add-roles',component:AddRolesComponent},
  { path: 'modify-roles',component:ModifyRoleComponent},
];

export const RolesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
