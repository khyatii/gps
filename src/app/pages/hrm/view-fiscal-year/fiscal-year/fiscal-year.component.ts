import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.css']
})
export class FiscalYearComponent implements OnInit {

  fiscalYearForm: FormGroup;
  txtDate: any;
  txtDate1: any;
  startYear: any;
  endYear: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  isActiveYearErr: boolean = true;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  backgroundColor = {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private route: Router,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.fiscalYearForm = this.fb.group({
      "startDate": ['', Validators.required],
      "endDate": ['', Validators.required],
      "active": [''],
      "description": ['']
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
    if (formValues.active == "") {
      formValues.active = false;
    }
    formValues.startDate = this.txtDate;
    formValues.endDate = this.txtDate1;
    formValues.session_year = this.startYear + "-" + this.endYear;
    this.hrmService.fiscalYear(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/view-fiscal-year']);
        }, 2000)
      } else {
        this.showError();
      }
    }, err => {
      if (err.err.status == 400) {
        this.showActiveYearErr();
      }
    })
  }

  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
    this.startYear = event.date.year;
  }
  onDateChanged1(event: IMyDateModel) {
    this.txtDate1 = event.date.year + "-" + event.date.month + "-" + event.date.day;
    this.endYear = event.date.year;
  }

  get startDate() {
    return this.fiscalYearForm.controls.startDate
  }
  get endDate() {
    return this.fiscalYearForm.controls.endDate
  }
  get active() {
    return this.fiscalYearForm.controls.active
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
  showActiveYearErr() {
    window.scrollTo(500, 0);
    this.isActiveYearErr = false;
    setTimeout(() => {
      this.isActiveYearErr = true;
    }, 2000);
  }

}
