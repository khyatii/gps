import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login.component";
import { LoginRouting } from "./login.routing";
import { UserService } from "../services/user.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginGaurd } from '../common/routegaurd/logingaurd';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  imports: [
    CommonModule,LoginRouting,ReactiveFormsModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, SetPasswordComponent],
  providers:[UserService,LoginGaurd]
})
export class LoginModule { }
