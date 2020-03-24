import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupCompanyComponent } from "./signup-company.component";
import { SignupCompanyRouting } from "./signup-company.routing";
import { UserService } from "../../services/user.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,SignupCompanyRouting,ReactiveFormsModule
  ],
  declarations: [SignupCompanyComponent],
  providers:[UserService]
})
export class SignupCompanyModule { }
