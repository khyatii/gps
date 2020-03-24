import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class CompanyService extends CommonService {
  
  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }
  getCountry(){
    return super.getValue('location');
  }
  getState(id){
    return super.getValue(`location/${id}`)
  }
  getCity(id){
    return super.getValue(`location/cities/${id}`)
  }
  
  signupCompany(value){
    return super.postValue(value,'company/signup');
  }
}
