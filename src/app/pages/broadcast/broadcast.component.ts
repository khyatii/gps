import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {

  emailHide: boolean = true;
  smsHide: boolean = true;
  backgroundColor: {};

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        this.backgroundColor = {
          "background-color": state.counter
        }
      })
  }

  email() {
    this.emailHide = true;
    this.smsHide = true;
  }
  sms() {
    this.emailHide = false;
    this.smsHide = false;
  }

}
