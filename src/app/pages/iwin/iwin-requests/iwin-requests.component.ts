import { iwinService } from './../../../services/iwin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-iwin-requests',
  templateUrl: './iwin-requests.component.html',
  styleUrls: ['./iwin-requests.component.css']
})
export class IwinRequestsComponent implements OnInit {
  dataArray = [];
  iwinForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  id: any;
  p: number = 1;
  backgroundColor : {};

  constructor(private iwinService: iwinService, private fb: FormBuilder, private router: Router,
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

    this.iwinForm = this.fb.group({
      "statusChange": ['']
    });
    
    this.iwinService.getIwinRequests().subscribe(res => {
      this.dataArray = res;
    });
  }
  submit(formvalues) {
    formvalues.id = this.id;
    this.iwinService.updateIwinStatus(formvalues).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
        window.location.reload();
      } else {
        this.showError();
      }
    });
  }
  statusAction(dataId) {
    this.id = dataId;
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
