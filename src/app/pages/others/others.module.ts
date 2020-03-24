import { SanitizeHtmlPipe } from './../../pipes/pipe.safehtml';
import { OthersComponent } from './others.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageService } from './../../services/pages.service';
import { AuthGuard } from './../../common/routegaurd/authgaurd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { OthersRouting } from './others.routing';
import { OthersService } from '../../services/others.service';
import { MeetingsComponent } from './meetings/meetings.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { ModifyMeetingsComponent } from './meetings/modify-meetings/modify-meetings.component';
import { AdminMeetingsComponent } from './admin-meetings/admin-meetings.component';
import { ViewMeetingsComponent } from './admin-meetings/view-meetings/view-meetings.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { PostQuestionComponent } from './questionnaire/post-question/post-question.component';
import { ModifyQuestionComponent } from './questionnaire/modify-question/modify-question.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewQuestionnaireComponent } from './questionnaire/view-questionnaire/view-questionnaire.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MyDateRangePickerModule,
        OthersRouting, MyDatePickerModule, AngularMultiSelectModule,EditorModule,
        NgxPaginationModule,AngularDateTimePickerModule,DateTimePickerModule,TagInputModule
    ],
    declarations: [
        OthersComponent,SanitizeHtmlPipe,
        MeetingsComponent,
        AddMeetingsComponent,
        ModifyMeetingsComponent,
        AdminMeetingsComponent,
        ViewMeetingsComponent,
        QuestionnaireComponent,
        PostQuestionComponent,
        ModifyQuestionComponent,
        ViewQuestionnaireComponent,
    ],
    providers: [AuthGuard, OthersService, PageService]
})
export class OthersModule { }