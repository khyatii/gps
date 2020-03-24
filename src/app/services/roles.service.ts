import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class RolesService extends CommonService {

  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }
  saveData(value) {
    return super.postValue(value, 'role/save');
  }
  getAllRoles(){
    return super.getValue('role/getAllRoles');
  }
  getRoleInfo(id){
    return super.getValue(`role/getRoleInfo/${id}`);
  }
  updateData(value){
    return super.postValue(value, 'role/update');
  }
}
