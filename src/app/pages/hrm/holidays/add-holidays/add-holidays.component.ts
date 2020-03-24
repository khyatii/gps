import { PageService } from './../../../../services/pages.service';
import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-add-holidays',
  templateUrl: './add-holidays.component.html',
  styleUrls: ['./add-holidays.component.css']
})
export class AddHolidaysComponent implements OnInit {

  holidaysForm: FormGroup;
  txtDate: any;
  year;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  bsValue;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder,
    private route: Router, private ngRedux: NgRedux<IAppState>) { }

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
    this.holidaysForm = this.fb.group({
      "name": ['', Validators.required],
      "date": ['', Validators.required],
      "repeat": [''],
      "description": ['']
    });
  }

  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + event.date.month + "-" + event.date.day
    this.year = event.date.year;
  }

  submit(formValues) {
    if (formValues.repeat == "") {
      formValues.repeat = false;
    }
    formValues.date = this.txtDate;
    formValues.year = this.year;
    this.hrmService.addHolidays(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        // this.pageService.getSuccessMessage(false);
        // this.hrmService.getHrmStatus(true);
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/holidays']);
        }, 2000)
      } else {
        // this.pageService.getErrorMessage(false);
        this.showError();
      }
    })
  }

  get name() {
    return this.holidaysForm.controls.name
  }
  get date() {
    return this.holidaysForm.controls.date
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
