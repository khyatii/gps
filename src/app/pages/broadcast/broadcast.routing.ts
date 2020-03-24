import { BroadcastListComponent } from './broadcast-list/broadcast-list.component';
import { BroadcastComponent } from './broadcast.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewBroadcastComponent } from './view-broadcast/view-broadcast.component';

const routes: Routes = [
    { path: '', component: BroadcastListComponent },
    { path: 'view', component: ViewBroadcastComponent },
    { path: 'send', component: BroadcastComponent },

];
export const BroadcastRouting: ModuleWithProviders = RouterModule.forChild(routes);