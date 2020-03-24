import { Router } from '@angular/router';
import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.css']
})
export class WeekDaysComponent implements OnInit {

  p: number = 1;
  weekDaysArray = [];
  backgroundColor: {};

  constructor(private hrmService:HrmService,private route:Router,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.hrmService.getWeekDays().subscribe(res => {
      this.weekDaysArray = res.data;
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

  delete(objData, index) {
    var id = objData.id;
		let value = { id };
		if (confirm(`Are you sure to delete Week days for ` + objData.user_name + ` ?`)) {
			this.hrmService.deleteWeekDays(value).subscribe(dataany => {
				this.weekDaysArray.splice(index, 1);
			})
		}
  }

  edit(objData){
    let id = objData.id;
    this.route.navigate(['/pages/hrm/modifyWeekDays', { id }]);
  }

}
