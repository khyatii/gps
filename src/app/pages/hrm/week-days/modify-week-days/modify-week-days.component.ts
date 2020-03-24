import { UserService } from './../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-week-days',
  templateUrl: './modify-week-days.component.html',
  styleUrls: ['./modify-week-days.component.css']
})
export class ModifyWeekDaysComponent implements OnInit {

  weekDaysForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  value: any;
  staffArray = [];
  staffName;
  allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weeks = [];
  optionsMap = {};
  optionsChecked = [];
  optionsUnChecked = [];
  user_name;
  backgroundColor: {};
  weekDay = [];
  rolesArray = [];

  constructor(private hrmService: HrmService, private fb: FormBuilder, private ngRedux: NgRedux<IAppState>,
    private route: Router, private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }
    this.weekDaysForm = this.fb.group({
      "staffId": ['', Validators.required],
      "weekDays": ['', Validators.required],
      "roles": ['', Validators.required]
    });
    this.userService.getRoles().subscribe(res => {
      this.rolesArray = res;
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
    this.hrmService.getOneWeekDay(this.value).subscribe(res => {
      this.user_name = res.data[0].user_name;
      this.weekDay = res.data[0].working_days.split(',');
      this.staffId.setValue(res.data[0].user_id);
      this.roles.setValue(res.data[0].role_id);
      let valuesToRemove = this.weekDay;
      let filteredItems = this.allDays.filter(item => !valuesToRemove.includes(item))
      for (let i = 0; i < this.weekDay.length; i++) {
        let obj = [{
          week: this.weekDay[i],
          status: true
        }]
        this.weeks.push(obj[0])
      }
      for (let i = 0; i < filteredItems.length; i++) {
        let obj1 = [{
          week: filteredItems[i],
          status: false
        }]
        this.weeks.push(obj1[0])
      }
      let data = { roleId: res.data[0].role_id }
      this.userService.getUserRoles(data).subscribe(res => {
        this.staffArray = res.data;
      });

    });
  }

  updateCheckedOptions(option, event) {
    this.optionsMap[option.week] = event.target.checked;
  }
  staffChange(val) {
    for (let i = 0; i < this.staffArray.length; i++) {
      if (this.staffArray[i].id == val._value) {
        this.staffName = (this.staffArray[i].first_name) + ' ' + this.staffArray[i].last_name;
      }
    }
  }

  submit(formValues) {
    for (var x in this.optionsMap) {
      if (this.optionsMap[x] === true) {
        this.optionsChecked.push(x);
      } else {
        this.optionsUnChecked.push(x);
      }
    }
    var valuesToRemove = this.optionsUnChecked;
    let filteredItems = this.weekDay.filter(item => !valuesToRemove.includes(item))
    const finalArr = [...filteredItems, ...this.optionsChecked]
    this.optionsChecked = [];
    formValues.weekDay = finalArr;
    formValues.id = this.value.id;
    if (this.staffName === undefined) formValues.user_name = this.user_name;
    else formValues.user_name = this.staffName;
    this.hrmService.modifyWeekDays(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/week-days']);
        }, 2000)
      } else {
        this.showError();
      }
    });
  }

  get roles() {
    return this.weekDaysForm.controls.roles
  }
  get staffId() {
    return this.weekDaysForm.controls.staffId
  }
  get weekDays() {
    return this.weekDaysForm.controls.weekDays
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
