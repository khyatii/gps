import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Goalv2Component } from './goalv2.component';

const routes: Routes = [
  { path: '',component:Goalv2Component
},
];
export const Goalv2RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);