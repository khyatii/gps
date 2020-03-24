import { HrmService } from './../services/hrm.service';
import { RightSidebarUserComponent } from './rightsidebar/right-sidebar-user/right-sidebar-user.component';
import { RightSidebarAlertComponent } from './rightsidebar/right-sidebar-alert/right-sidebar-alert.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from "./pages.component";
import { PagesRouting } from "./pages.routing";
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from '../common/routegaurd/authgaurd';
import { ImageService } from '../services/image.service';
import { PageService } from '../services/pages.service';
import { AccessManagementService } from '../services/access-management.service';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,PagesRouting,MyDatePickerModule,NgxPaginationModule
  ],
  declarations: [PagesComponent, HeaderComponent, LeftsidebarComponent, RightsidebarComponent,
    RightSidebarAlertComponent, RightSidebarUserComponent],
  providers: [AuthGuard, ImageService, PageService, AccessManagementService, HrmService]
})
export class PagesModule { }
