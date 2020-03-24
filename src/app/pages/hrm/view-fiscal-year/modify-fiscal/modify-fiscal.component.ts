import { HrmService } from './../../../../services/hrm.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-fiscal',
  templateUrl: './modify-fiscal.component.html',
  styleUrls: ['./modify-fiscal.component.css']
})
export class ModifyFiscalComponent implements OnInit {

  fiscalYearForm: FormGroup;
  txtDate: any;
  txtDate1: any;
  startYear: any;
  endYear: any;
  value;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  backgroundColor = {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private ngRedux: NgRedux<IAppState>,
    private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }
    this.fiscalYearForm = this.fb.group({
      "startDate": ['', Validators.required],
      "endDate": ['', Validators.required],
      "active": [''],
      "description": ['']
    });
    this.hrmService.getOneFiscalYear(this.value).subscribe(res => {
      let stringToSplit = res.data[0].start_date;
      let stringToSplit2 = res.data[0].end_date;
      let x = stringToSplit.split("-");
      let y = stringToSplit2.split("-");
      this.fiscalYearForm.patchValue({
        startDate: { date: { year: x[0], month: x[1], day: x[2] } },
        endDate: { date: { year: y[0], month: y[1], day: y[2] } }
      });
      this.active.setValue(res.data[0].isActive);
      this.description.setValue(res.data[0].description);
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
    formValues.id = this.value.id;
    if (formValues.active == "") {
      formValues.active = false;
    }
    formValues.startDate = this.txtDate;
    formValues.endDate = this.txtDate1;
    formValues.session_year = this.startYear + "-" + this.endYear;

    this.hrmService.updateFiscalYear(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/view-fiscal-year']);
        }, 2000)
      } else {
        this.showError();
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
  get description() {
    return this.fiscalYearForm.controls.description
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
