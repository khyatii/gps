import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      "email": ['', Validators.email],
    });
  }

  submit(formValues) {
    this.userService.forgotPassword(formValues).subscribe(res => {
      this.successMsg = "Reset Password Link has been sent on your Email";
      this.showSuccess();
      setTimeout(() => {
        this.isSuccess = true;
        this.route.navigate(['/'])
      }, 2000);
    }, (err) => {
      if (err.status == 404) {
        this.errorMsg = "Email does not exist";
        this.showError();
        return;
      } else {
        this.errorMsg = "Some Error Occured";
        this.showError();
      }
    });
  }

  get email() {
    return this.forgotPasswordForm.controls.email
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
