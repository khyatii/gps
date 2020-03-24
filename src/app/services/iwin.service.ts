import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class iwinService extends CommonService {

  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }

  saveData(value) {
    return super.postValue(value, 'iwin/save');
  }
  getData() {
    return super.getValue('iwin/show');
  }
  getOneIwin(value) {
    return super.postValue(value, 'iwin/getOneIwin');
  }
  updateIwin(value) {
    return super.postValue(value, 'iwin/updateIwin');
  }
  deleteIwin(value) {
    return super.postValue(value, 'iwin/deleteIwin');
  }
  getIwinRequests() {
    return super.getValue('iwin/getIwinRequests');
  }
  updateIwinStatus(value) {
    return super.postValue(value, 'iwin/updateIwinStatus');
  }
}
