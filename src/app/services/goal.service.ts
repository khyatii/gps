import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class GoalService extends CommonService {
  
  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }
  postGoal(value){
    return super.postValue(value, 'goal');
  }
  getGoal(date){
    return super.postValue( date,'users/getGoals');
  }
  getSingleGoal(value){
    return super.postValue(value, 'getSingleGoal');
  }
  updateAccuracy(value){
    return super.postValue(value, 'updateAccuracy');
  }
  getMonthlyGoals(value){
    return super.postValue(value, 'getMonthlyGoals');
  }
  getCustomGoals(value){
    return super.postValue(value, 'getCustomGoals');
  }
}
