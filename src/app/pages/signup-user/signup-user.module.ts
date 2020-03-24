import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupUserComponent } from "./signup-user.component";
import { SignupUserRouting } from "./signup-user.routing";
import { UserService } from "../../services/user.service";
import { ReactiveFormsModule } from "@angular/forms";
import { RecaptchaModule } from 'ng2-recaptcha';
import { ViewUsersComponent } from './view-users/view-users.component';
import { SendInvitationComponent } from './send-invitation/send-invitation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  imports: [
    CommonModule,SignupUserRouting,ReactiveFormsModule,NgxPaginationModule,RecaptchaModule.forRoot(),
  ],
  declarations: [SignupUserComponent, ViewUsersComponent, SendInvitationComponent, UpdateUserComponent],
  providers:[UserService]
})
export class SignupUserModule { }
