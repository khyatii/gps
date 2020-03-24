import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateprofileComponent } from './updateprofile.component';

const routes: Routes = [
    { path: '',  component:UpdateprofileComponent,
    children:[
        { path: 'user',loadChildren: './user/user.module#UserModule',}, 
         
      ]
},
];
export const UpdateprofileRouting: ModuleWithProviders = RouterModule.forChild(routes);

