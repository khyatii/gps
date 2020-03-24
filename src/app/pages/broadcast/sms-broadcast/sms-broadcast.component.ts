import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OthersService } from '../../../services/others.service';
import { UserService } from '../../../services/user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-sms-broadcast',
  templateUrl: './sms-broadcast.component.html',
  styleUrls: ['./sms-broadcast.component.css']
})
export class SmsBroadcastComponent implements OnInit {

  broadCastingForm: FormGroup;
  rolesArray = [];
  usersArray = [];
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
  backgroundColor = {};

  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router,
    private othersService: OthersService, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.broadCastingForm = this.fb.group({
      'roles': ['', Validators.required],
      'staffId': [[], Validators.required],
      'text': ['']
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
    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })

  }

  submit(formValues) {
    formValues.type = 'sms';
    this.othersService.smsBroadcast(formValues).subscribe(res => {
      if (res.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/broadcast']);
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
          this.dropdown = [{
            id: this.usersArray[i].id,
            itemName: name,
            email: this.usersArray[i].email,
            mobile: this.usersArray[i].mobile
          }];
          this.dropdownList.push(this.dropdown[0]);
        }
      }
    });
  }

  get roles() {
    return this.broadCastingForm.controls.roles
  }
  get staffId() {
    return this.broadCastingForm.controls.staffId
  }
  get text() {
    return this.broadCastingForm.controls.text
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

