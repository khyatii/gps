import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { BehaviorSubject } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class PageService extends CommonService {
  
  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }
  getModule(){
    return super.getValue('module');
  }
  getPages(pageId){
    return super.postValue(pageId,'pages');
  }

  getAllPages(){
    return super.postValue('','allpages');
  }

  private successSource = new BehaviorSubject(true);
  successStatus = this.successSource.asObservable();

  private errorSource = new BehaviorSubject(true);
  errorStatus = this.errorSource.asObservable();

  getSuccessMessage(status: boolean) {
    this.successSource.next(status)
  }

  getErrorMessage(status: boolean) {
    this.errorSource.next(status)
  }

  getUserPages(roleId){
    return super.postValue(roleId,'getUserPages');
  }
}
