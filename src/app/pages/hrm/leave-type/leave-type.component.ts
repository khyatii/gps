import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {

  p: number = 1;
  leaveTypeArray = [];
  backgroundColor={};

  constructor(private hrmService:HrmService,private route:Router,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.hrmService.viewLeaveType().subscribe(res => {
      this.leaveTypeArray = res.data;
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
		if (confirm(`Are you sure to delete Leave type ` + objData.name + ` ?`)) {
			this.hrmService.deleteLeaveType(value).subscribe(dataany => {
				this.leaveTypeArray.splice(index, 1);
			})
		}
  }

  edit(objData){
    let id = objData.id;
    this.route.navigate(['/pages/hrm/modifyLeaveType', { id }]);
  }

}
