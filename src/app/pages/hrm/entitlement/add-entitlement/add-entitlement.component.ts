import { UserService } from './../../../../services/user.service';
import { HrmService } from './../../../../services/hrm.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-add-entitlement',
  templateUrl: './add-entitlement.component.html',
  styleUrls: ['./add-entitlement.component.css']
})
export class AddEntitlementComponent implements OnInit {

  entitlementsForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  staffArray = [];
  staffIdArray = [];
  leaveTypeArray = [];
  leaveIdArray = [];
  leavePeriodArray = [];
  leavePeriodId = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdown = [];
  rolesArray = [];
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private userService: UserService,
    private ngRedux: NgRedux<IAppState>, private route: Router) { }

  ngOnInit() {
    this.entitlementsForm = this.fb.group({
      "roles": ['', Validators.required],
      "staffId": ['', Validators.required],
      "leaveType": ['', Validators.required],
      "leavePeriod": ['', Validators.required],
      "entitlements": ['', Validators.required],
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
    this.userService.getRoles().subscribe(res => {
      this.rolesArray = res;
    });
    this.hrmService.viewLeaveType().subscribe(res => {
      this.leaveTypeArray = res.data;
    })
    this.hrmService.viewFiscalYear().subscribe(res => {
      this.leavePeriodArray = res.data;
    })
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  submit(formValues) {
    formValues.staffIdArray = this.staffIdArray;
    formValues.leaveIdArray = this.leaveIdArray;
    formValues.leavePeriodArray = this.leavePeriodId;
    this.hrmService.addEntitlements(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/entitlement']);
        }, 2000)
      } else {
        this.showError();
      }
    })
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
  staffChange(val) {
    for (let i = 0; i < this.staffArray.length; i++) {
      if (this.staffArray[i].id == val._value) {
        this.staffIdArray = (this.staffArray[i]);
      }
    }
  }
  leaveTypeChange(val) {
    for (let i = 0; i < this.leaveTypeArray.length; i++) {
      if (this.leaveTypeArray[i].id == val._value) {
        this.leaveIdArray = (this.leaveTypeArray[i]);
      }
    }
  }
  leavePeriodChange(val) {
    for (let i = 0; i < this.leavePeriodArray.length; i++) {
      if (this.leavePeriodArray[i].id == val._value) {
        this.leavePeriodId = (this.leavePeriodArray[i]);
      }
    }
  }

  get roles() {
    return this.entitlementsForm.controls.roles
  }
  get staffId() {
    return this.entitlementsForm.controls.staffId
  }
  get leaveType() {
    return this.entitlementsForm.controls.leaveType
  }
  get leavePeriod() {
    return this.entitlementsForm.controls.leavePeriod
  }
  get entitlements() {
    return this.entitlementsForm.controls.entitlements
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

