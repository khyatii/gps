import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  p: number = 1;
  holidaysArray = [];
  backgroundColor: {};

  constructor(private hrmService:HrmService,private route:Router,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.hrmService.viewHolidays().subscribe(res => {
      this.holidaysArray = res.data;
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
		if (confirm(`Are you sure to delete Holiday ` + objData.name + ` ?`)) {
			this.hrmService.deleteHolidays(value).subscribe(dataany => {
				this.holidaysArray.splice(index, 1);
			})
		}
  }

  edit(objData){
    let id = objData.id;
    this.route.navigate(['/pages/hrm/modifyHolidays', { id }]);
  }

}
