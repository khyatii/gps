import { OthersService } from './../../../../services/others.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-add-meetings',
  templateUrl: './add-meetings.component.html',
  styleUrls: ['./add-meetings.component.css']
})
export class AddMeetingsComponent implements OnInit {

  meetingsForm: FormGroup;
  rolesArray = [];
  usersArray = [];
  user_name: any;
  txtDate: any;
  host: any;
  hostId: any;
  dateTime: any;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdown = [];
  staffArray = [];
  backgroundColor: {};

  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router,
    private othersService: OthersService,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.meetingsForm = this.fb.group({
      'title': ['', Validators.required],
      'roles': ['', Validators.required],
      'staffId': [[], Validators.required],
      'dated': ['', Validators.required],
      'duration': ['', Validators.required],
      'type': ['', Validators.required],
      'note': ['']
    });
    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
    this.userservice.getLoginUser().subscribe(res => {
      this.host = res[0].first_name + ' ' + res[0].last_name;
      this.hostId = res[0].id;
    })
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
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
    formValues.host = this.host;
    formValues.hostId = this.hostId;
    formValues.dateTime = this.dateTime;
    this.othersService.saveMeetings(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/others/meetings']);
        }, 2000)
      } else {
        this.showError();
      }
    })
  }

  roleSelected(data) {
    let value = { roleId: data._value }
    this.userservice.getUserRoles(value).subscribe(res => {
      this.usersArray = res.data;
      if (res.data != undefined) {
        for (let i = 0; i < res.data.length; i++) {
          let name = this.usersArray[i].first_name + " " + this.usersArray[i].last_name;
          this.dropdown = [{ id: this.usersArray[i].id, itemName: name }];
          this.dropdownList.push(this.dropdown[0]);
        }
      }
    });
  }

  onDateSelect(event) {
    this.dateTime = event;
  }

  get title() {
    return this.meetingsForm.controls.title
  }
  get roles() {
    return this.meetingsForm.controls.roles
  }
  get staffId() {
    return this.meetingsForm.controls.staffId
  }
  get dated() {
    return this.meetingsForm.controls.dated
  }
  get duration() {
    return this.meetingsForm.controls.duration
  }
  get type() {
    return this.meetingsForm.controls.type
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
