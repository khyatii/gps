import { ActivatedRoute, Router } from '@angular/router';
import { iwinService } from './../../../services/iwin.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-modify-iwin',
  templateUrl: './modify-iwin.component.html',
  styleUrls: ['./modify-iwin.component.css']
})
export class ModifyIwinComponent implements OnInit {

  iwinForm: FormGroup;
  rolesArray = [];
  usersArray = [];
  user_name: any;
  txtDate: any;
  value: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router,
    private iwinService: iwinService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }

    this.iwinForm = this.fb.group({
      'title': ['', Validators.required],
      'roles': ['', Validators.required],
      'staffId': ['', Validators.required],
      'date': ['', Validators.required],
      'category': ['', Validators.required],
      'desc': ['']
    });
    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
    this.iwinService.getOneIwin(this.value).subscribe(res => {
      let stringToSplit = res[0].date;
      let x = stringToSplit.split("-");
      this.iwinForm.patchValue({
        date: {
          date: {
            year: x[0],
            month: x[1],
            day: x[2]
          }
        }
      });
      this.title.setValue(res[0].title);
      this.roles.setValue(res[0].role_id);
      this.staffId.setValue(res[0].user_id);
      this.category.setValue(res[0].category);
      this.desc.setValue(res[0].description);
      let data = { roleId: res[0].role_id }
      this.userservice.getUserRoles(data).subscribe(res => {
        this.usersArray = res.data;
      });
      this.userservice.getUserData(res[0].user_id).subscribe(res => {
        this.user_name = res[0].first_name + " " + res[0].last_name;
      });
    })
  }
  updateIwin(formValues) {
    formValues.id = this.value.id;
    formValues.user_name = this.user_name;
    formValues.date = this.txtDate;
    this.iwinService.updateIwin(formValues).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/iwin']);
        }, 2000)
      } else {
        this.showError();
      }
    });
  }
  roleSelected(data) {
    let val = { roleId: data._value }
    this.userservice.getUserRoles(val).subscribe(res => {
      this.usersArray = res.data;
    });
  }
  userSelected(data) {
    this.userservice.getUserData(data._value).subscribe(res => {
      this.user_name = res[0].first_name + " " + res[0].last_name;
    });
  }
  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + ("0" + event.date.month).slice(-2) + "-" + ("0" + event.date.day).slice(-2)
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

  get title() {
    return this.iwinForm.controls.title
  }
  get roles() {
    return this.iwinForm.controls.roles
  }
  get staffId() {
    return this.iwinForm.controls.staffId
  }
  get date() {
    return this.iwinForm.controls.date
  }
  get category() {
    return this.iwinForm.controls.category
  }
  get desc() {
    return this.iwinForm.controls.desc
  }

}
