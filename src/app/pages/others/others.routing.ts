import { ViewQuestionnaireComponent } from './questionnaire/view-questionnaire/view-questionnaire.component';
import { ModifyQuestionComponent } from './questionnaire/modify-question/modify-question.component';
import { PostQuestionComponent } from './questionnaire/post-question/post-question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ViewMeetingsComponent } from './admin-meetings/view-meetings/view-meetings.component';
import { AdminMeetingsComponent } from './admin-meetings/admin-meetings.component';
import { ModifyMeetingsComponent } from './meetings/modify-meetings/modify-meetings.component';
import { AddMeetingsComponent } from './meetings/add-meetings/add-meetings.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'meetings', component: MeetingsComponent },
    { path: 'newMeeting', component: AddMeetingsComponent },
    { path: 'modifyMeetings', component: ModifyMeetingsComponent },
    { path: 'admin-meetings', component: AdminMeetingsComponent },
    { path: 'viewMeetings', component: ViewMeetingsComponent },
    { path: 'questionnaire', component: QuestionnaireComponent },
    { path: 'post-question', component: PostQuestionComponent },
    { path: 'modify-question', component: ModifyQuestionComponent },
    { path: 'view-questionnaire', component: ViewQuestionnaireComponent },
];
export const OthersRouting: ModuleWithProviders = RouterModule.forChild(routes);

