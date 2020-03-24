import { HrmService } from './../../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent implements OnInit {

  leaveTypeForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  backgroundColor = {};

  constructor(private fb: FormBuilder, private hrmService: HrmService, private ngRedux: NgRedux<IAppState>,
    private route: Router) { }

  ngOnInit() {
    this.leaveTypeForm = this.fb.group({
      "name": ['', Validators.required],
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
      })
  }

  submit(formValues) {
    this.hrmService.addLeaveType(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/leave-type']);
        }, 2000)
      } else {
        this.showError();
      }
    })
  }

  get name() {
    return this.leaveTypeForm.controls.name
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
