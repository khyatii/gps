import { Router } from '@angular/router';
import { OthersService } from './../../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-admin-meetings',
  templateUrl: './admin-meetings.component.html',
  styleUrls: ['./admin-meetings.component.css']
})
export class AdminMeetingsComponent implements OnInit {

  p: number = 1;
  dataArray = [];
  newDataArray = [];
  dataList = [];
  backgroundColor: {};

  constructor(private othersService: OthersService,private route:Router,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
      {
        this.backgroundColor = {
          "background-color": state.counter,
          "color": "white"
        }
      }
    });
    this.othersService.viewMeetings().subscribe(res => {
      this.dataArray = res.data;
      for (let i = 0; i < res.data.length; i++) {
        let d = new Date(this.dataArray[i].date_time);
        let date = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
          ("0" + d.getDate()).slice(-2) + '  ' + ("0" + d.getHours()).slice(-2) + ':' +
          ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
        this.newDataArray = [
          {
            id: res.data[i].id,
            date_time: date,
            title: res.data[i].title,
            user_name: res.data[i].user_name,
            host: res.data[i].host,
            note: res.data[i].note,
            status: res.data[i].status,
            // duration: res.data[i].duration,
            // type: res.data[i].type,
          }
        ];
        this.dataList.push(this.newDataArray[0]);
      }
    })
  }
  viewDetails(id){
    this.route.navigate(['/pages/others/viewMeetings', { id }]);
  }

}
