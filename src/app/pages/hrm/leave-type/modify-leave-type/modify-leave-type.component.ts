import { HrmService } from './../../../../services/hrm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-leave-type',
  templateUrl: './modify-leave-type.component.html',
  styleUrls: ['./modify-leave-type.component.css']
})
export class ModifyLeaveTypeComponent implements OnInit {

  leaveTypeForm: FormGroup;
  value: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  backgroundColor = {};

  constructor(private fb: FormBuilder, private hrmService: HrmService, private ngRedux: NgRedux<IAppState>,
    private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }

    this.leaveTypeForm = this.fb.group({
      "name": ['', Validators.required],
      "description": ['']
    });
    this.hrmService.getOneLeaveType(this.value).subscribe(res => {
      this.name.setValue(res.data[0].name);
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
      })
  }

  submit(formValues) {
    formValues.id = this.value.id;
    this.hrmService.updateLeaveType(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        // this.pageService.getSuccessMessage(false);
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/hrm/leave-type']);
        }, 2000)
      } else {
        this.showError();
        // this.pageService.getErrorMessage(false);
      }
    })
  }

  get name() {
    return this.leaveTypeForm.controls.name
  }
  get description() {
    return this.leaveTypeForm.controls.description
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
