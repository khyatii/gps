import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IwinRouting } from "./iwin.routing";
import { IwinComponent } from "./iwin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { iwinService } from "../../services/iwin.service";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModifyIwinComponent } from './modify-iwin/modify-iwin.component';
import { IwinRequestsComponent } from './iwin-requests/iwin-requests.component'; // <-- import the module
@NgModule({
  imports: [
    CommonModule, IwinRouting, ReactiveFormsModule, NgxPaginationModule, MyDatePickerModule
  ],
  declarations: [IwinComponent, ModifyIwinComponent, IwinRequestsComponent],
  providers: [iwinService]
})
export class IwinModule {

}
