import { UserService } from './../../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../../store/reducer';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  userData: any
  value: boolean = false
  updateForm: FormGroup
  disable: boolean = true
  countryArray: Array<Object>;
  stateArray: Array<Object>;
  cityArray: Array<Object>;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  profileId : any;
  isUser : boolean = true;
  backgroundColor : {};

  constructor(private fb: FormBuilder, private userService: UserService,private route: Router,private router: ActivatedRoute,
    private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    //redux
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter,
              "color" : "white"
           }
       }
    })

    this.profileId = this.router.snapshot.params['id'];  
    if(this.profileId != undefined){
      this.getSelectedUserProfileDetails(this.profileId);
      this.isUser = false;
    }
    else{
      this.getCurrentUserProfileDetails();
    }        

    this.userService.getCountry()
      .subscribe((res) => {
        this.countryArray = res
      })
  }

  getSelectedUserProfileDetails(id){
    this.userService.getSelectedUserContactDetails(id).subscribe(res => {
      this.userData = res[0];
      this.value = true;
      this.updateForm = this.fb.group({
        "address": [this.userData.address],
        "country": [this.userData.country],
        "state": [this.userData.state],
        "city": [this.userData.city],
        "pin_code": [this.userData.zip_code],
        "email": [this.userData.email],
        "mobile": [this.userData.mobile]
      })
      this.userService.getCountry().subscribe((res) => {
        this.countryArray = res;
      })
      this.userService.getState(this.userData.country).subscribe(res => {
        this.stateArray = res;
      })
      this.userService.getCity(this.userData.state).subscribe(res => {
        this.cityArray = res;
      })
    })
  }

  getCurrentUserProfileDetails(){
    this.userService.getContactDetails().subscribe(res => {
      this.userData = res[0];
      this.value = true;
      this.updateForm = this.fb.group({
        "address": [this.userData.address],
        "country": [this.userData.country],
        "state": [this.userData.state],
        "city": [this.userData.city],
        "pin_code": [this.userData.zip_code],
        "email": [this.userData.email],
        "mobile": [this.userData.mobile]
      })
      this.userService.getCountry().subscribe((res) => {
        this.countryArray = res;
      })
      this.userService.getState(this.userData.country).subscribe(res => {
        this.stateArray = res;
      })
      this.userService.getCity(this.userData.state).subscribe(res => {
        this.cityArray = res;
      })
    })
  }

  getState(e: Event) {
    const value: number = parseInt((<HTMLSelectElement>event.srcElement).value);
    this.userService.getState(value).subscribe(res => this.stateArray = res)
  }

  getCity(e: Event) {
    const value: number = parseInt((<HTMLSelectElement>event.srcElement).value);
    this.userService.getCity(value).subscribe(res => this.cityArray = res)
  }

  Update(value) {
    value.token = localStorage.getItem('token');
    this.userService.postContactDetail(value).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
        }, 2000)
      } else {
        this.showError();
      }
    })
  }

  UpdateSelectedUser(value){
    value.token = localStorage.getItem('token');
    value.id = this.profileId;
    this.userService.postContactDetail(value).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
        }, 2000)
      } else {
        this.showError();
      }
    })
  }

  get address() {
    return this.updateForm.controls.address
  }
  get country() {
    return this.updateForm.controls.country
  }
  get state() {
    return this.updateForm.controls.state
  }
  get city() {
    return this.updateForm.controls.city
  }
  get pin_code() {
    return this.updateForm.controls.pin_code
  }
  get email() {
    return this.updateForm.controls.email
  }
  get mobile() {
    return this.updateForm.controls.mobile
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
