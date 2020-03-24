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
@Injectable()
export class CandidateCommonService {

 constructor(public http: Http, public ngRedux:NgRedux<IAppState>) { }
 postValue(value, page) {
   let headers = new Headers();
   headers.append('Authorization', localStorage.getItem('token'));
   headers.append('candidrefUrl',window.location.href.split('=')[1]);
   return this.http.post(`${Url.url}/${page}`, value, { headers: headers })
     .map(res => res.json())
     // .catch((err) => {
     //   return err;
     // })
 }

 getValue(page) {
   let headers = new Headers();
   headers.append('Authorization', localStorage.getItem('token'));
   return this.http.get(`${Url.url}/${page}`, { headers: headers })
     .map(res => res.json())
     .catch((err) => {
       if (err.status == 404)
         return Observable.throw(new NotFoundError())

       else
         return Observable.throw(new AppError(err))
     })
 }
}