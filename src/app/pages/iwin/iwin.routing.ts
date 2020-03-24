import { IwinRequestsComponent } from './iwin-requests/iwin-requests.component';
import { ModifyIwinComponent } from './modify-iwin/modify-iwin.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IwinComponent } from "./iwin.component";

const routes: Routes = [
    { path: '', component: IwinComponent },
    { path: 'modify-iwin', component: ModifyIwinComponent },
    { path: 'iwin-requests', component: IwinRequestsComponent },

];
export const IwinRouting: ModuleWithProviders = RouterModule.forChild(routes);

