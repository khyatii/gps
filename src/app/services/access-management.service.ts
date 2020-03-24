import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class AccessManagementService extends CommonService {

  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }

  private accessSource = new BehaviorSubject(true);
  accessStatus = this.accessSource.asObservable();

  getAcessStatus(status: boolean) {
    this.accessSource.next(status)
  }
  saveData(value) {
    return super.postValue(value, 'access/save');
  }
  saveModules(value) {
    return super.postValue(value, 'access/saveModules');
  }
  getData() {
    return super.getValue('iwin/show');
  }
  getModule(value) {
    return super.postValue(value, 'access/getRoleModule');
  }
  getRoleAccessedModules(value) {
    return super.postValue(value, 'access/getRoleAccessedModules');
  }
} 
