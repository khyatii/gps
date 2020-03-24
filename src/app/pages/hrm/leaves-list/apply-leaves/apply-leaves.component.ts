import { HrmService } from './../../../../services/hrm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {

  leavesForm: FormGroup;
  txtDate: any;
  txtDate1: any;
  days: any;
  jsdate: any;
  jsdate1: any;
  leave_type: any;
  leaveType_id: any;
  leave_balanceId: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  leaveTypeArray = [];
  entitlements: any;
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '230px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private ngRedux: NgRedux<IAppState>,
    private route: Router) { }

  ngOnInit() {
    this.leavesForm = this.fb.group({
      "leaveType": ['', Validators.required],
      "viewDate": ['', Validators.required],
      "comments": [''],
    });
    this.hrmService.getUserLeaveType().subscribe(res => {
      this.leaveTypeArray = res.data;
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

  submit(formValues) {
    formValues.status = "pending";
    formValues.fromDate = this.txtDate;
    formValues.toDate = this.txtDate1;
    formValues.days = this.days;
    formValues.leave_type = this.leave_type;
    formValues.leaveType_id = this.leaveType_id;
    formValues.leave_balanceId = this.leave_balanceId;
    formValues.leave_balance = parseInt(this.entitlements) - this.days;
    this.hrmService.applyLeaves(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/leaves-list']);
        }, 2000)
      } else {
        this.showError();
      }
    })
  }

  leaveTypeChange(val) {
    let leaveTypeId = { leaveTypeId: val._value }
    this.hrmService.getUserLeaveBalance(leaveTypeId).subscribe(res => {
      this.entitlements = res.data[0].entitlements;
      this.leave_type = res.data[0].leave_type;
      this.leaveType_id = res.data[0].leaveType_id;
      this.leave_balanceId = res.data[0].id;
    })
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
    if (event.beginJsDate != null || event.endJsDate != null) {
      var ONEDAY = 1000 * 60 * 60 * 24;
      var date1_ms = event.beginJsDate.getTime();
      var date2_ms = event.endJsDate.getTime();
      var difference_ms = Math.abs(date1_ms - date2_ms);
      this.days = (Math.round(difference_ms / ONEDAY) + 1);
    }
  }

  get leaveType() {
    return this.leavesForm.controls.leaveType
  }
  get viewDate() {
    return this.leavesForm.controls.viewDate
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
