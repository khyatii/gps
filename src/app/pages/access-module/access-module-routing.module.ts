import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessModuleComponent } from './access-module.component';

const routes: Routes = [
  { path: '',component:AccessModuleComponent
},
];
export const AccessModuleRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);