import { UserService } from './../../../services/user.service';
import { HrmService } from './../../../services/hrm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-admin-leave-list',
  templateUrl: './admin-leave-list.component.html',
  styleUrls: ['./admin-leave-list.component.css']
})
export class AdminLeaveListComponent implements OnInit {

  p: number = 1;
  leavesArray = [];
  staffArray = [];
  staffIdArray;
  txtDate;
  txtDate1;
  leavesForm: FormGroup;
  searchForm: FormGroup;
  id: any;
  days: any;
  leave_balance: any;
  leave_balance_id: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
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
  usersArray = [];
  rolesArray = [];
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>, private userService: UserService) { }

  ngOnInit() {
    this.leavesForm = this.fb.group({
      "statusChange": ['']
    });
    this.searchForm = this.fb.group({
      "viewDate": [''],
      "staffId": ['', Validators.required],
      "roles": ['', Validators.required]
    });
    this.userService.getRoles().subscribe(res => {
      this.rolesArray = res;
    });
    this.hrmService.getAdminLeaveList().subscribe(res => {
      this.leavesArray = res.data;
    });
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
  }

  search(formValues) {
    formValues.staffId = this.staffIdArray.id;
    formValues.fromDate = this.txtDate;
    formValues.toDate = this.txtDate1;
    this.hrmService.getStaffDetail(formValues).subscribe(res => {
      this.leavesArray = res.data;
    })
  }

  submit(formValues) {
    formValues.id = this.id;
    formValues.days = this.days;
    formValues.leave_balance = parseInt(this.leave_balance);
    formValues.leave_balance_id = this.leave_balance_id;
    formValues.fromDate = this.txtDate;
    formValues.toDate = this.txtDate1;
    this.hrmService.updateAdminStatusLeaves(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        window.location.reload();
      } else {
        this.showError();
      }
    })
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
  }
  leaveAction(objData) {
    this.id = objData.id;
    this.days = objData.days;
    this.leave_balance = objData.leave_balance;
    this.leave_balance_id = objData.leave_balance_id;
  }
  roleSelected(data) {
    let value = { roleId: data._value }
    this.userService.getUserRoles(value).subscribe(res => {
      this.staffArray = res.data;
    });
  }
  staffChange(val) {
    for (let i = 0; i < this.staffArray.length; i++) {
      if (this.staffArray[i].id == val._value) {
        this.staffIdArray = (this.staffArray[i]);
      }
    }
  }
  get staffId() {
    return this.searchForm.controls.staffId
  }
  get roles() {
    return this.searchForm.controls.roles
  }
  showSuccess() {
    window.scrollTo(500, 0);
    this.isSuccess = false;
    setTimeout(() => {
      this.isSuccess = true;
    }, 2000);
  }
  showError() {
    window.scrollTo(500, 0);
    this.isError = false;
    setTimeout(() => {
      this.isError = true;
    }, 2000);
  }


}

