import { Router } from '@angular/router';
import { OthersService } from './../../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-broadcast-list',
  templateUrl: './broadcast-list.component.html',
  styleUrls: ['./broadcast-list.component.css']
})
export class BroadcastListComponent implements OnInit {

  dataArray = [];
  id: any;
  p: number = 1;
  backgroundColor = {};

  constructor(private othersService: OthersService, private route: Router,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.othersService.getBroadcast().subscribe(res => {
      this.dataArray = res.data;
    });
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
  }

  view(objData) {
    let id = objData.id;
    this.route.navigate(['/pages/broadcast/view', { id }]);
  }

}
