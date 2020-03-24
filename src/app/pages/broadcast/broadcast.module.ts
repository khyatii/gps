import { OthersService } from './../../services/others.service';
import { BroadcastRouting } from './broadcast.routing';
import { BroadcastComponent } from './broadcast.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SmsBroadcastComponent } from './sms-broadcast/sms-broadcast.component';
import { EmailBroadcastComponent } from './email-broadcast/email-broadcast.component';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewBroadcastComponent } from './view-broadcast/view-broadcast.component';
import { BroadcastListComponent } from './broadcast-list/broadcast-list.component';

@NgModule({
    imports: [
        CommonModule, BroadcastRouting, ReactiveFormsModule, NgxPaginationModule,
        MyDatePickerModule, AngularMultiSelectModule,EditorModule
    ],
    declarations: [BroadcastComponent, SmsBroadcastComponent, EmailBroadcastComponent, ViewBroadcastComponent, BroadcastListComponent],
    providers: [OthersService]
})
export class BroadcastModule { }