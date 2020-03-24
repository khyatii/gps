import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from "../services/user.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotFoundError } from "../common/error/notfound";
import { Router } from '@angular/router';
import * as _ from "lodash";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailError : boolean = false;
  pwdError : boolean = false;

  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router, private rd: Renderer2) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "txtEmail": ['', Validators.email],
      "password": ['', Validators.required]
    })

  }

  public active: boolean = true;
  ShowPass() {
    this.active = !this.active;
  }

  get txtEmail() {
    return this.loginForm.get('txtEmail')
  }

  get password() {
    return this.loginForm.get('password')
  }

  handleChange(){
    this.emailError = false;
    this.pwdError = false;
  }

  submit(form: FormGroup) {
    // console.log("form", form)
    this.userservice.postLogin(form)
      .subscribe(
        (res) => {
          let token = res.token;
          localStorage.setItem('token', token);
          localStorage.setItem('roleid', res.role);
          localStorage.setItem('name', res.name);
          localStorage.setItem('id', res.id);
          localStorage.setItem('primaryColor', '#1c4561');
          localStorage.setItem('secondryColor', '#22232B')
          this.router.navigate(['pages/dashboard']);
        }, ((err: Error) => {
            if(err['_body'] == "email not found"){
              this.emailError = true;
            }
            else{
              this.pwdError = true;
            }
        })
      )

  }
}
