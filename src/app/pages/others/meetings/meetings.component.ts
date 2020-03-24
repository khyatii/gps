import { OthersService } from './../../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  p: number = 1;
  dataArray = [];
  newDataArray = [];
  dataList = [];
  backgroundColor: {};

  constructor(private othersService: OthersService, private route: Router,private ngRedux: NgRedux<IAppState>) { }

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
            duration: res.data[i].duration,
            title: res.data[i].title,
            host: res.data[i].host,
            note: res.data[i].note,
            status: res.data[i].status,
            user_name: res.data[i].user_name,
          }
        ];
        this.dataList.push(this.newDataArray[0]);
      }
    })
  }

  delete(objData, index) {
    var id = objData.id;
    let value = { id };
    if (confirm(`Are you sure to delete Meeting ` + objData.title + ` ?`)) {
      this.othersService.deleteMeetings(value).subscribe(dataany => {
        this.dataArray.splice(index, 1);
      })
    }
  }

  edit(objData) {
    let id = objData.id;
    this.route.navigate(['/pages/others/modifyMeetings', { id }]);
  }

}
