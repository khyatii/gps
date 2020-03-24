import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { UserService } from "./services/user.service";
import { CompanyService } from "./services/company.service";
import { ModalModule, DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { IAppState,rootReducer, INITIAL_STATE } from './store/reducer';
import { LoginGaurd } from './common/routegaurd/logingaurd';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { RecaptchaModule } from 'ng2-recaptcha';
import { AuthGuard } from './AuthGuard';
import {NgxPaginationModule} from 'ngx-pagination';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { TagInputModule } from 'ngx-chips';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { CandidateReferenceComponent } from './candidate-reference/candidate-reference.component';
import { BasicInfoComponent } from './candidate-reference/basic-info/basic-info.component';
import { QualificationComponent } from './candidate-reference/qualification/qualification.component';
import { SkillsComponent } from './candidate-reference/skills/skills.component';
import { WorkExperienceComponent } from './candidate-reference/work-experience/work-experience.component';
import { SocialContactsComponent } from './candidate-reference/social-contacts/social-contacts.component';
import { CandidateRefService } from './services/candidate-ref.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';



@NgModule(
  {  declarations:  
    [    AppComponent, ErrorComponent, SignupUserComponent, LinkExpiredComponent,
      CandidateReferenceComponent, BasicInfoComponent, QualificationComponent, SkillsComponent, 
      WorkExperienceComponent, SocialContactsComponent],  
imports: 
    [    BrowserModule,routing,HttpModule,BrowserAnimationsModule,ReactiveFormsModule, NgxPaginationModule,
      ModalModule.forRoot(),NgReduxModule,RecaptchaModule.forRoot(),AngularDateTimePickerModule,AmazingTimePickerModule,
      DatepickerModule.forRoot(),
      BsDatepickerModule.forRoot(),TagInputModule,NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.circleSwish
      })
   ], 
providers: 
[UserService, CompanyService,LoginGaurd,AuthGuard, CandidateRefService],  bootstrap: [AppComponent]})

export class AppModule {
  constructor(ngRedux:NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer,INITIAL_STATE);
  }
 }