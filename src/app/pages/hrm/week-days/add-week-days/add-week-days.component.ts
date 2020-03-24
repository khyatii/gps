import { UserService } from './../../../../services/user.service';
import { Router } from '@angular/router';
import { HrmService } from './../../../../services/hrm.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-add-week-days',
  templateUrl: './add-week-days.component.html',
  styleUrls: ['./add-week-days.component.css']
})
export class AddWeekDaysComponent implements OnInit {

  weekDaysForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  staffArray = [];
  staffIdArray = [];
  weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  optionsMap = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  };
  optionsChecked = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdown = [];
  rolesArray=[];
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder,private ngRedux: NgRedux<IAppState>,
    private route: Router,private userService:UserService) { }

  ngOnInit() {
    this.weekDaysForm = this.fb.group({
      "roles": ['', Validators.required],
      "staffId": [[], Validators.required],
      "weekDays": ['', Validators.required]
    });
    // this.hrmService.getStaffDetails().subscribe(res => {
    //   this.staffArray = res.data;
    //   if (res.data != undefined) {
    //     for (let i = 0; i < res.data.length; i++) {
    //       let name = this.staffArray[i].first_name + " " + this.staffArray[i].last_name;
    //       this.dropdown = [{ id: this.staffArray[i].id, itemName: name }];
    //       this.dropdownList.push(this.dropdown[0]);
    //     }
    //   }
    // });
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
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }
  roleSelected(data) {
    let value = { roleId: data._value }
    this.userService.getUserRoles(value).subscribe(res => {
      this.staffArray = res.data;
      if (res.data != undefined) {
        for (let i = 0; i < res.data.length; i++) {
          let name = this.staffArray[i].first_name + " " + this.staffArray[i].last_name;
          this.dropdown = [
            { id: this.staffArray[i].id, itemName: name }
          ]
          this.dropdownList.push(this.dropdown[0]);
        }
      }
    });
  }
  updateCheckedOptions(option, event) {
    this.optionsMap[option] = event.target.checked;
  }
  staffChange(val) {
    for (let i = 0; i < this.staffArray.length; i++) {
      if (this.staffArray[i].id == val._value) {
        this.staffIdArray = (this.staffArray[i]);
      }
    }
  }

  submit(formValues) {
    for (var x in this.optionsMap) {
      if (this.optionsMap[x]) {
        this.optionsChecked.push(x);
      }
    }
    this.weekDay = this.optionsChecked;
    this.optionsChecked = [];
    formValues.weekDay = this.weekDay;
    formValues.data = this.staffIdArray;
    this.hrmService.addWeekDays(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/week-days']);
        }, 2000)
      } else {
        this.showError();
      }
    })
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
