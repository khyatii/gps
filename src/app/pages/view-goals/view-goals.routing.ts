import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGoalsComponent } from './view-goals.component';

const routes: Routes = [
    {
        path: '', component: ViewGoalsComponent
    }
];
export const ViewGoalsRouting: ModuleWithProviders = RouterModule.forChild(routes);