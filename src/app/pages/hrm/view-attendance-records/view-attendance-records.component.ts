import { Component, OnInit } from '@angular/core';
import { HrmService } from './../../../services/hrm.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-view-attendance-records',
  templateUrl: './view-attendance-records.component.html',
  styleUrls: ['./view-attendance-records.component.css']
})
export class ViewAttendanceRecordsComponent implements OnInit {
  
  p: number = 1;
  txtDate;
  txtDate1;
  recordDetails = [];
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '270px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  backgroundColor: {};

  constructor(private hrmService: HrmService,private ngRedux: NgRedux<IAppState>) { }
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
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
    let value = { fromDate: this.txtDate, toDate: this.txtDate1 }
    this.hrmService.getAttendanceTime(value).subscribe(res => {
      this.recordDetails = res.data;
    });
  }

}
