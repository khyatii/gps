import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../subscribe/signup-company/passwordvalidator';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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
  public showloader: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  messageValue: string;

  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router ) {  }

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

      this.getInvitationLinkDetails();
      
  }

  getInvitationLinkDetails(){
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let value = {
      'link' : searchParams.get('link')
    }
    this.userservice.getInvitationLinkDetails(value).subscribe(res=>{
      //console.log(res)
      if(res.length > 0){
        let data = res[0];
        this.usersignupform.controls['txtEmail'].setValue(data.sender_email)
      }
    },
    err=>{
      let msg = err._body;
      msg = JSON.parse(msg);
      if(msg.err == "link expired"){
        this.route.navigate(['/link-expired'])
      }
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
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    value.link = searchParams.get('link');
    this.userservice.saveInvitedUser(value).subscribe(res=>{
      this.usersignupform.reset();
      this.messageValue = "Saved SuccessFully";
      this.showSuccessMessage();
      setTimeout(()=>{
        this.route.navigate(['/'])
      },4000)
      
    },
    err=>{
      console.log(err)
    })
    
  }

  showSuccessMessage() {
    // set showloader to true to show loading div on view
    this.showloader = true;
    setTimeout(()=>{
      this.showloader = false;
    },3000)
    // this.timer = Observable.timer(3000); // 5000 millisecond means 5 seconds
    // this.subscription = this.timer.subscribe(() => {
    //   // set showloader to false to hide loading div from view after 5 seconds
    //   this.showloader = false;
    // });
  }

}