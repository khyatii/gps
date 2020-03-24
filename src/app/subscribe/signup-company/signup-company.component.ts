import { PasswordValidator } from './passwordvalidator';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CompanyService } from "../../services/company.service";
import { AppError } from "../../common/error/apperror";
import { NotFoundError } from "../../common/error/notfound";
import { Router } from '@angular/router';
import { DuplicateError } from '../../common/error/duplicateError';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements OnInit {
 
  countryArray: Array<Object>;
  stateArray:Array<Object>;
  cityArray:Array<Object>;
  companysignupform: FormGroup;

  constructor(private cfb: FormBuilder,private companyservice:CompanyService,private route:Router) {
    this.companysignupform = this.cfb.group({
      txtCompanyName : ['',Validators.required],
      txtAuthorizedCompanyName : ['',Validators.required],
      txtEmail : ['',Validators.email],
      password : ['',Validators.minLength(8)],
      confirmpassword : ['',Validators.minLength(8)],
      txtMobile : ['',Validators.min(1000000000)],
      txtCountry : ['',Validators.required],
      txtState : ['',Validators.required],
      txtCity : ['',Validators.required],
      txtZipcode : ['',Validators.required],
      txtAddress1 : [],
      txtAddress2 : [],
      txtWorkNo : [],
      txtOfficeNo : [],

    }, {
      validator : PasswordValidator.ValidPassword
    });
  }

  ngOnInit() {
    this.companyservice.getCountry().subscribe(res=>this.countryArray = res)
  
  }

  get companyname()  {
    return this.companysignupform.controls.txtCompanyName
  }
  get authorizedcompanyname()  {
    return this.companysignupform.controls.txtAuthorizedCompanyName
  }
  get email()  {
    return this.companysignupform.controls.txtEmail
  }
  get password()  {
    return this.companysignupform.controls.password
  }
  get confirmpassword()  {
    return this.companysignupform.controls.confirmpassword
  }
  get mobile()  {
    return this.companysignupform.controls.txtMobile
  }
  get country()  {
    return this.companysignupform.controls.txtCountry
  }
  get state()  {
    return this.companysignupform.controls.txtState
  }
  get city()  {
    return this.companysignupform.controls.txtCity
  }
  get zipcode()  {
    return this.companysignupform.controls.txtZipcode
  }
  getState(e:Event){
    const value:number =  parseInt((<HTMLSelectElement>event.srcElement).value);
    this.companyservice.getState(value).subscribe(res=>this.stateArray = res)
  }

  getCity(e:Event){
    const value:number =  parseInt((<HTMLSelectElement>event.srcElement).value);
    this.companyservice.getCity(value).subscribe(res=>this.cityArray = res)
  }

  submit(value){
    this.companyservice.signupCompany(value)
    .subscribe((res)=>{
      localStorage.setItem('token',res.token)
      localStorage.setItem('roleid',res.role)
      localStorage.setItem('name',res.name);
      this.route.navigate(['pages/dashboard'])
    },(err:Error)=>{
      if(err instanceof DuplicateError){
        this.companysignupform.setErrors({"duplicateEmail":true})
      }
    })
  
  }
 

}