import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponentRouting } from './user.routing';
import { UserComponent } from './user.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaldetailsComponent } from './profile-details/personaldetails/personaldetails.component';
import { JobdetailsComponent } from './profile-details/jobdetails/jobdetails.component';
import { ProfileHeaderComponent } from './header/profileHeader.component';
import { HeaderComponent } from '../../header/header.component';
import { ContactDetailsComponent } from './profile-details/contact-details/contact-details.component';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { Ng4FilesModule } from 'angular4-files-upload';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,MyDatePickerModule, UserComponentRouting,Ng4FilesModule,
     FormsModule, ReactiveFormsModule, TagInputModule, BsDatepickerModule.forRoot(),
  ],
  declarations: [
    UserComponent, ProfileHeaderComponent,
    ProfileDetailsComponent, PersonaldetailsComponent,
    JobdetailsComponent, ContactDetailsComponent],
  providers: [HeaderComponent]
})
export class UserModule { }
