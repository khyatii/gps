import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Url } from "../common/serverurl.class";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NotFoundError } from "../common/error/notfound";
import { Observable } from "rxjs/Observable";
import { AppError } from "../common/error/apperror";
import { DuplicateError } from '../common/error/duplicateError';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';
import { LOADER } from '../store/action';

@Injectable()
export class CommonService {

 constructor(public http: Http,private ngRedux:NgRedux<IAppState>) { }
 postValue(value, page) { 
  this.startLoader();
   let headers = new Headers();
   headers.append('Authorization', localStorage.getItem('token'));  
   return this.http.post(`${Url.url}/${page}`, value, { headers: headers })
     .map((res)=>{
       this.stopLoader();
        return res.json()
     })
     .catch((err) => {
      this.stopLoader();
       return err;
     })
 }

 getValue(page) {
   this.startLoader();
   let headers = new Headers();
   headers.append('Authorization', localStorage.getItem('token'));
   return this.http.get(`${Url.url}/${page}`, { headers: headers })
     .map((res) => {
      this.stopLoader();
      return res.json()
     })
     .catch((err) => {
      this.stopLoader();
       if (err.status == 404)
         return Observable.throw(new NotFoundError())

       else
         return Observable.throw(new AppError(err))
     })
 }

//  function to start loader
 startLoader(){
  var loaderAction = {
    type: LOADER,
    loader: true
  }
  this.ngRedux.dispatch(loaderAction)
 }
//  function to stop loader
 stopLoader(){
  var loaderAction = {
    type: LOADER,
    loader: false
  }
  this.ngRedux.dispatch(loaderAction)
 }
}