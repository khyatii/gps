import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteCandidiateComponent } from './invite-candidiate.component';

const routes: Routes = [
  { path  : ':id', component : InviteCandidiateComponent }
];

export const InviteCandidiateRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
