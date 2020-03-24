import { UserService } from './../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-entitlement',
  templateUrl: './modify-entitlement.component.html',
  styleUrls: ['./modify-entitlement.component.css']
})
export class ModifyEntitlementComponent implements OnInit {

  entitlementsForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  staffArray = [];
  staffIdArray: any;
  leaveIdArray: any;
  leavePeriodId: any;
  leaveTypeArray;
  leavePeriodArray;
  value: any;
  staffName: any;
  leaveTypeName: any;
  leavePeriodName: any;
  rolesArray = [];
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder, private ngRedux: NgRedux<IAppState>,
    private route: Router, private router: ActivatedRoute, private userService: UserService) { }

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
      })
    this.entitlementsForm = this.fb.group({
      "roles": ['', Validators.required],
      "staffId": ['', Validators.required],
      "leaveType": ['', Validators.required],
      "leavePeriod": ['', Validators.required],
      "entitlements": ['', Validators.required],
    });
    this.userService.getRoles().subscribe(res => {
      this.rolesArray = res;
    });
    this.hrmService.viewLeaveType().subscribe(res => {
      this.leaveTypeArray = res.data;
    });
    this.hrmService.viewFiscalYear().subscribe(res => {
      this.leavePeriodArray = res.data;
    });
    this.hrmService.getOneEntitlement(this.value).subscribe(res => {
      this.staffName = res.data[0].user_name;
      this.leaveTypeName = res.data[0].leave_type;
      this.leavePeriodName = res.data[0].leave_period;

      this.roles.setValue(res.data[0].role_id);
      this.staffId.setValue(res.data[0].user_id);
      this.leaveType.setValue(res.data[0].leaveType_id);
      this.leavePeriod.setValue(res.data[0].leave_period_id);
      this.entitlements.setValue(res.data[0].entitlements);

      let data = { roleId: res.data[0].role_id }
      this.userService.getUserRoles(data).subscribe(res => {
        this.staffArray = res.data;
      });

    });
  }

  submit(formValues) {

    if (this.staffIdArray === undefined) formValues.staffIdArray = this.staffName;
    else formValues.staffIdArray = this.staffIdArray.first_name + " " + this.staffIdArray.last_name;

    if (this.leaveIdArray === undefined) formValues.leaveIdArray = this.leaveTypeName;
    else formValues.leaveIdArray = this.leaveIdArray.name;

    if (this.leavePeriodId === undefined) formValues.leavePeriodArray = this.leavePeriodName;
    else formValues.leavePeriodArray = this.leavePeriodId;

    formValues.id = this.value.id;
    this.hrmService.modifyEntitlements(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
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

