import { PasswordValidator } from './passwordvalidator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { NotFoundError } from "../../common/error/notfound";
import { AppError } from "../../common/error/apperror";
import { PageService } from '../../services/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {

  usersignupform: FormGroup;
  countryArray: Array<Object>;
  stateArray: Array<Object>;
  cityArray: Array<Object>;
  roleArray: Array<Object>;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  backgroundColor={};
  
  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router,
    private pageService: PageService) {

  }

  ngOnInit() {
    this.usersignupform = this.fb.group({
      txtFirstName: ['', Validators.required],
      txtLastName: ['', Validators.required],
      txtEmail: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      confirmpassword: ['', Validators.minLength(8)],
      txtMobile: ['', Validators.min(1000000000)],
      txtCountry: ['', Validators.required],
      txtState: ['', Validators.required],
      txtCity: ['', Validators.required],
      txtZipcode: ['', Validators.required],
      txtNationality: [],
      txtAddress1: [],
      txtAddress2: [],
      txtRole: [],
      BloodGroup: [],
      gender: []
    }, {
        validator: PasswordValidator.ValidPassword
      });
    this.userservice.getCountry()
      .subscribe((res) => {
        this.countryArray = res

      })
    this.userservice.getRoles()
      .subscribe((res) => {
        this.roleArray = res;
      })
  }

  get firstname() {
    return this.usersignupform.controls.txtFirstName
  }
  get lastname() {
    return this.usersignupform.controls.txtLastName
  }
  get email() {
    return this.usersignupform.controls.txtEmail
  }
  get password() {
    return this.usersignupform.controls.password
  }
  get confirmpassword() {
    return this.usersignupform.controls.confirmpassword
  }
  get mobile() {
    return this.usersignupform.controls.txtMobile
  }
  get country() {
    return this.usersignupform.controls.txtCountry
  }
  get state() {
    return this.usersignupform.controls.txtState
  }
  get city() {
    return this.usersignupform.controls.txtCity
  }
  get zipcode() {
    return this.usersignupform.controls.txtZipcode
  }
  get gender() {
    return this.usersignupform.controls.gender
  }
  get BloodGroup() {
    return this.usersignupform.controls.BloodGroup
  }

  getState(e: Event) {
    const value: number = parseInt((<HTMLSelectElement>event.srcElement).value);
    this.userservice.getState(value).subscribe(res => this.stateArray = res)
  }

  getCity(e: Event) {
    const value: number = parseInt((<HTMLSelectElement>event.srcElement).value);
    this.userservice.getCity(value).subscribe(res => this.cityArray = res)
  }
  resolved(e) {

  }

  submit(value) {
    let token = localStorage.getItem('token');
    value.token = token;
    value.user_type = 'U';
    //value.txtRole = 2;
    console.log(value)
    this.userservice.postSignup(value).
      subscribe((res) => {
        if (res.token == 1) {
          this.pageService.getSuccessMessage(false);
          setTimeout(() => {
            this.route.navigate(['/pages/users']);
          }, 3000)
        } else {
          this.pageService.getErrorMessage(false);
        }
      }, err => {
        this.pageService.getErrorMessage(false);
        this.usersignupform.setErrors({ "emailExists": true })
      })
  }


}