import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { ModifyRoleComponent } from './modify-role/modify-role.component';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [RolesComponent, AddRolesComponent, ModifyRoleComponent],
  providers : [RolesService]
})
export class RolesModule { }