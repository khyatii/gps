import { NotFoundError } from './../../common/error/notfound';
import { GoalService } from './../../services/goal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';

@Component({
  selector: 'app-view-goals',
  templateUrl: './view-goals.component.html',
  styleUrls: ['./view-goals.component.css']
})
export class ViewGoalsComponent implements OnInit {
  ViewGoalForm: FormGroup;
  chosenId: any;
  txtDate: any;
  txtDate1: any;
  goalsArray = [];
  entries = [{ 'id': '1', 'description': 'From Last Week' },
  { 'id': '2', 'description': 'From Last Month' },
  { 'id': '3', 'description': 'From Last Year' },
  { 'id': '4', 'description': 'Choose Custom' }];
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  backgroundColor : {};

  constructor(private fb: FormBuilder, private goalService: GoalService,private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    this.ViewGoalForm = this.fb.group({
      "viewDate": ['']
    });

    // redux
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter,
              "color" : "white"
           }
       console.log(this.backgroundColor)
       }
    })
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.txtDate = event.beginDate.year + "-" + ("0" + event.beginDate.month).slice(-2) + "-" + ("0" + event.beginDate.day).slice(-2);
    this.txtDate1 = event.endDate.year + "-" + ("0" + event.endDate.month).slice(-2) + "-" + ("0" + event.endDate.day).slice(-2);
    let data = { fromDate: this.txtDate, toDate: this.txtDate1 }
    this.goalService.getCustomGoals(data).subscribe(res => {
      this.goalsArray = res.data;
    })
  }

  onSelectionChange(value) {
    this.chosenId = value.id;
    let data = { data: value.id }
    this.goalService.getMonthlyGoals(data).subscribe(res => {
      this.goalsArray = res.data;
    }, (err: Error) => {
      if (err instanceof NotFoundError) {
      }
    })

  }
  // customSearch() {
  //   let data = { fromDate: this.txtDate, toDate: this.txtDate1 }
  //   this.goalService.getCustomGoals(data).subscribe(res => {
  //     this.goalsArray = res.data;
  //   })
  // }
  formatTime(timeMs: number) {
    var h = Math.floor(timeMs / 3600);
    var m = Math.floor(timeMs % 3600 / 60);
    return h + ' hours ' + m + ' minutes';
  }
  // dateChange(date) {
  //   this.txtDate = date.getFullYear() + '-' + +(date.getMonth() + 1) + '-' + date.getDate()
  // }
  // dateChange1(date) {
  //   this.txtDate1 = date.getFullYear() + '-' + +(date.getMonth() + 1) + '-' + date.getDate()
  // }
  

}
