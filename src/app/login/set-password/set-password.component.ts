import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordValidation } from '../../common/passwordValidation';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  setPasswordForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  value;

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private route: Router,
    private userService: UserService) { }

  ngOnInit() {
    if (this.router.snapshot.queryParams['link'] != undefined) {
      this.value = { id: this.router.snapshot.queryParams['link'] }
    }

    this.setPasswordForm = this.fb.group({
      "password": ['', [Validators.required, Validators.minLength(8)]],
      "confirmPassword": ['', Validators.required]
    }
      , {
        validator: PasswordValidation.MatchPassword // validation method
      });

    this.userService.checkTokenExpire(this.value).subscribe(res => {
      if (res) {
        if (res[0].active == 'I') {
          this.errorMsg = "Password reset token is invalid or has expired.";
          this.showError();
          setTimeout(() => {
            this.route.navigate(['/forgotPassword'])
          }, 3000);
          return;
        }
      }
    }, (err) => {
      this.errorMsg = "Some Error Occured";
      this.showError();
    });
  }

  submit(formValues) {
    formValues.link = this.value.id;
    this.userService.setPassword(formValues).subscribe(res => {
      this.successMsg = "Password Updated Sucessfully";
      this.showSuccess();
      setTimeout(() => {
        this.isSuccess = true;
        this.route.navigate(['/'])
      }, 2000);
    }, (err) => {
      this.errorMsg = "Some Error Occured";
      this.showError();
    });
  }

  get password() {
    return this.setPasswordForm.controls.password
  }
  get confirmPassword() {
    return this.setPasswordForm.controls.confirmPassword
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
