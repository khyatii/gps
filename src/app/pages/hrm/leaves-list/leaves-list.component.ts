import { FormGroup, FormBuilder } from '@angular/forms';
import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.css']
})
export class LeavesListComponent implements OnInit {

  p: number = 1;
  leavesArray = [];
  leavesForm: FormGroup;
  id: any;
  days: any;
  txtDate: any;
  txtDate1: any;
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
    width: '270px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService, private route: Router, private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.leavesForm = this.fb.group({
      "statusChange": ['']
    });
    this.hrmService.getLeavesList().subscribe(res => {
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
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
    let value = { fromDate: this.txtDate, toDate: this.txtDate1 }
    this.hrmService.getLeavesListByDate(value).subscribe(res => {
      this.leavesArray = res.data;
    });
  }
  submit(formValues) {
    formValues.id = this.id;
    formValues.days = this.days;
    formValues.leave_balance = parseInt(this.leave_balance);
    formValues.leave_balance_id = this.leave_balance_id;
    this.hrmService.updateStatusLeaves(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
      } else {
        this.showError();
      }
    })
  }

  leaveAction(objData) {
    this.id = objData.id;
    this.days = objData.days;
    this.leave_balance = objData.leave_balance;
    this.leave_balance_id = objData.leave_balance_id;
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
