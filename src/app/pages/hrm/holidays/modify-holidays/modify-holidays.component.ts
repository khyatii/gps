import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-holidays',
  templateUrl: './modify-holidays.component.html',
  styleUrls: ['./modify-holidays.component.css']
})
export class ModifyHolidaysComponent implements OnInit {

  holidaysForm: FormGroup;
  txtDate: any;
  value: any;
  year;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private route: Router,
    private router: ActivatedRoute, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }

    this.holidaysForm = this.fb.group({
      "name": ['', Validators.required],
      "date": ['', Validators.required],
      "repeat": [''],
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

    this.hrmService.getOneHoliday(this.value).subscribe(res => {
      let stringToSplit = res.data[0].date;
      let x = stringToSplit.split("-");
      this.holidaysForm.patchValue({
        date: {
          date: {
            year: x[0],
            month: x[1],
            day: x[2]
          }
        }, repeat: res.data[0].isRepeat
      });
      this.name.setValue(res.data[0].name);
      this.date.setValue(res.data[0].date);
      this.description.setValue(res.data[0].description);
    })
  }

  submit(formValues) {
    if (formValues.repeat == "") {
      formValues.repeat = false;
    }
    formValues.date = this.txtDate;
    formValues.id = this.value.id;
    formValues.year = this.year;
    this.hrmService.updateHolidays(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/holidays']);
        }, 2000)
      } else {
        this.showError();
      }
    })
  }
  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + event.date.month + "-" + event.date.day
    this.year = event.date.year;
  }
  get name() {
    return this.holidaysForm.controls.name
  }
  get date() {
    return this.holidaysForm.controls.date
  }
  get repeat() {
    return this.holidaysForm.controls.repeat
  }
  get description() {
    return this.holidaysForm.controls.description
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
