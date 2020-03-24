import { OthersService } from './../../../../services/others.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent implements OnInit {

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

  selectedItems = [];
  dropdownSettings = {};
  dropdown = [];
  dropdownList = [];
  dropdowns = [];
  dropdownLists = [];
  staffArray = [];
  value: any;
  status: any;
  backgroundColor: {};

  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router,
    private othersService: OthersService, private router: ActivatedRoute,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }
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
    this.meetingsForm = this.fb.group({
      'title': ['', Validators.required],
      'roles': ['', Validators.required],
      'staffId': [[], Validators.required],
      'dated': ['', Validators.required],
      'duration': ['', Validators.required],
      'type': ['', Validators.required],
      'note': ['']
    });

    this.othersService.getOneMeeting(this.value).subscribe(res => {
      this.status=res.data[0].status;
      this.title.setValue(res.data[0].title);
      this.roles.setValue(res.data[0].role_id);
      this.dated.setValue(res.data[0].date_time);
      this.duration.setValue(res.data[0].duration);
      this.type.setValue(res.data[0].type);
      this.note.setValue(res.data[0].note);

      let data = { roleId: res.data[0].role_id }
      this.userservice.getUserRoles(data).subscribe(res => {
        this.usersArray = res.data;
      });

      let value = { roleId: res.data[0].role_id }
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

      let val = { ids: res.data[0].user_id }
      this.userservice.getMultipleUserData(val).subscribe(resp => {
        for (let i = 0; i < resp.length; i++) {
          let name = resp[i].first_name + " " + resp[i].last_name;
          this.dropdowns = [
            { id: resp[i].id, itemName: name }
          ]
          this.dropdownLists.push(this.dropdowns[0]);
        }
        this.staffId.setValue(this.dropdownLists);
      })

    });


    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    });
    this.userservice.getLoginUser().subscribe(res => {
      this.host = res[0].first_name + ' ' + res[0].last_name;
      this.hostId = res[0].id;
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

  tobeDone(formValues, status) {
    formValues.id = this.value.id;
    formValues.host = this.host;
    formValues.hostId = this.hostId;
    formValues.status = status;
    this.othersService.updateMeetingStatus(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/others/admin-meetings']);
        }, 2000)
      } else {
        this.showError();
      }
    });
  }
  followUp(formValues, status) {
    formValues.id = this.value.id;
    formValues.host = this.host;
    formValues.hostId = this.hostId;
    formValues.status = status;
    this.othersService.updateMeetingStatus(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/others/admin-meetings']);
        }, 2000)
      } else {
        this.showError();
      }
    });
  }
  done(formValues, status) {
    formValues.id = this.value.id;
    formValues.host = this.host;
    formValues.hostId = this.hostId;
    formValues.status = status;
    this.othersService.updateMeetingStatus(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/others/admin-meetings']);
        }, 2000)
      } else {
        this.showError();
      }
    });
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
  get note() {
    return this.meetingsForm.controls.note
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


