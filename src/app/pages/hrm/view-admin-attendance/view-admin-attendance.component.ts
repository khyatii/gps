import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HrmService } from './../../../services/hrm.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-view-admin-attendance',
  templateUrl: './view-admin-attendance.component.html',
  styleUrls: ['./view-admin-attendance.component.css']
})
export class ViewAdminAttendanceComponent implements OnInit {
  
  p: number = 1;
  txtDate: any;
  txtDate1: any;
  recordDetails = [];
  rolesArray = [];
  usersArray = [];
  attendanceForm: FormGroup;
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: 'auto',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder,private ngRedux: NgRedux<IAppState>,
    private userservice: UserService) { }

  ngOnInit() {
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
      {
        this.backgroundColor = {
          "background-color": state.counter,
          "color": "white"
        }
      }
    });
    this.attendanceForm = this.fb.group({
      "roles": ['', Validators.required],
      "users": ['', Validators.required],
      "viewDate": ['', Validators.required]
    });
    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
  }

  search(formValues) {
    formValues.fromDate = this.txtDate;
    formValues.toDate = this.txtDate1;
    this.hrmService.adminAttendaceRecord(formValues).subscribe(res => {
      this.recordDetails = res.data;
    });
  }
  roleSelected(data) {
    let value = { roleId: data._value }
    this.userservice.getUserRoles(value).subscribe(res => {
      this.usersArray = res.data;
    });
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
  }
  
  get users() {
    return this.attendanceForm.controls.users
  }
  get roles() {
    return this.attendanceForm.controls.roles
  }
  get viewDate() {
    return this.attendanceForm.controls.viewDate
  }

}

