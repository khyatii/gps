import { style } from '@angular/animations';
import { StopwatchService } from './stopwatchservice';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { GoalService } from '../../../services/goal.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';



@Component({
  selector: 'app-goaltable',
  templateUrl: './goaltable.component.html',
  styleUrls: ['./goaltable.component.css']
})
export class GoaltableComponent implements OnInit {

  value: Date;
  array: Array<number> = [];
  incompletearray: Array<number> = [];
  count: number = 0;
  counter: number = 0;
  ViewData: any;
  increment: number = 0;
  todayYear: any;
  todayMonth: any;
  todayDate: any;
  selectedDateYear: any;
  selectedDateMonth: any;
  selectedDateDate: any;
  data1: any;
  IncompleteGoals: Array<any> = [];
  bsValue: Date;
  loadCounter : number = 0;

  constructor(private goalService: GoalService,private ngRedux:NgRedux<IAppState>) { }
  backgroundColor:{};
  ngOnInit() {
    this.bsValue = new Date();
    let txtDate = this.bsValue.getFullYear() + '-' + +(this.bsValue.getMonth() + 1) + '-' + this.bsValue.getDate()
    let newDate = { txtDate: txtDate }
    this.todayYear = this.bsValue.getFullYear();
    this.todayMonth = this.bsValue.getMonth();
    this.todayDate = this.bsValue.getDate();

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

  Row() {
    if ((this.todayYear <= this.selectedDateYear) && (this.todayMonth <= this.selectedDateMonth) && (this.todayDate <= this.selectedDateDate)) {
      this.count++;
      this.array.push(this.count)
    }
    else {
      alert('Cannot Add Goal in Previous date!')
    }

  }

  RemoveEmptyRow(approw: HTMLDivElement) {
    let emptylength = approw.querySelectorAll('app-goalrow.webkit').length
    for (let j = 0; j <= emptylength; j++) {
      let del = approw.querySelector('app-goalrow.webkit')
      if (del != null) {
        del.remove();
      }
    }
  }

  RemoveIncompleteGoal(incompleterow: HTMLDivElement) {
    let emptylength = incompleterow.querySelectorAll('app-incompletegoals.webkit').length
    for (let j = 0; j <= emptylength; j++) {
      let del = incompleterow.querySelector('app-incompletegoals.webkit')
      if (del != null) {
        del.remove();
      }
    }
  }

  RemoveLastDateRow(templateVarialble: HTMLDivElement) {
    let length = templateVarialble.querySelectorAll('.thead1').length
    for (let j = 0; j <= length; j++) {
      let rem = templateVarialble.querySelector('.thead1');
      if (rem != null) {
        rem.remove();
      }
    }
  }

  SelectedDateData(templateVarialble: HTMLDivElement) {
    for (var i = 0; i < this.ViewData.length; i++) {

      var expectedhours = ((this.ViewData[i].expected_time / 3600) - (this.ViewData[i].expected_time / 3600) % 1);
      var expectedminutes = (this.ViewData[i].expected_time / 60) % 60;
      var actualhours = ((this.ViewData[i].actual_time / 3600) - (this.ViewData[i].actual_time / 3600) % 1);
      var actualminutes = (((this.ViewData[i].actual_time / 60) % 60) - ((this.ViewData[i].actual_time / 60) % 60) % 1);
      if ((this.ViewData[i].expected_time >= this.ViewData[i].actual_time) && (this.ViewData[i].accuracy == 100)) {

        templateVarialble.insertAdjacentHTML('beforeend',
          ` <div class="row  thead1 no-gutters">
          <div class="col-3 fontCalibri">`+ this.ViewData[i].goal_name + `</div>
          <div class="col-4 fontCalibri">`+ this.ViewData[i].goal_description + `</div>
          <div class="col-2 fontCalibri">`+ expectedhours + ` hours ` + expectedminutes + ` minutes</div>
          <div class="col-2 fontCalibri">`+ actualhours + ` hours ` + actualminutes + ` minutes</div>
          <div class="col-1 fontCalibri">`+ this.ViewData[i].accuracy + ` % </div>
          <div class="progress col-2 br-4" style="background:transparent"> 
            <span aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" 
              class="progress-bar colorGreen align-self-center" role="progressbar" style="width: ${this.ViewData[i].accuracy}%;
              margin: 6px 0px; height: 8px;">
            </span>
          </div>`
        );
      }
      if ((this.ViewData[i].expected_time < this.ViewData[i].actual_time) && (this.ViewData[i].accuracy >= 50 && this.ViewData[i].accuracy < 100)) {

        templateVarialble.insertAdjacentHTML('beforeend',
          ` <div class="row thead1 no-gutters">
          <div class="col-3 fontCalibri">`+ this.ViewData[i].goal_name + `</div>
          <div class="col-4 fontCalibri">`+ this.ViewData[i].goal_description + `</div>
          <div class="col-2 fontCalibri">`+ expectedhours + ` hours ` + expectedminutes + ` minutes</div>
          <div class="col-2 fontCalibri">`+ actualhours + ` hours ` + actualminutes + ` minutes</div>
          <div class="col-1 fontCalibri">`+ this.ViewData[i].accuracy + ` % </div>
          <div class="progress col-2 br-4" style="background:transparent"> 
            <span aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" 
              class="progress-bar colorYellow align-self-center" role="progressbar" style="width: ${this.ViewData[i].accuracy}%;
              margin: 6px 0px; height: 8px;">
            </span>
          </div>`
        );
      }
      if ((this.ViewData[i].expected_time < this.ViewData[i].actual_time) && (this.ViewData[i].accuracy > 0 && this.ViewData[i].accuracy < 50)) {

        templateVarialble.insertAdjacentHTML('beforeend',
          ` <div class="row thead1 no-gutters">
          <div class="col-3 fontCalibri">`+ this.ViewData[i].goal_name + `</div>
          <div class="col-4 fontCalibri">`+ this.ViewData[i].goal_description + `</div>
          <div class="col-2 fontCalibri">`+ expectedhours + ` hours ` + expectedminutes + ` minutes</div>
          <div class="col-2 fontCalibri">`+ actualhours + ` hours ` + actualminutes + ` minutes</div>
          <div class="col-1 fontCalibri">`+ this.ViewData[i].accuracy + ` % </div>
          <div class="progress col-2 br-4" style="background:transparent"> 
            <span aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" 
              class="progress-bar colorRed align-self-center" role="progressbar" style="width: ${this.ViewData[i].accuracy}%;
              margin: 6px 0px; height: 8px;">
            </span>
          </div>`
        );
      }
      
    }
    
  }
  // ShowIncompleteGoals(){
  //   let datalength = this.ViewData.length;
  //   let count = 0;
  //   for( var i=0;i< datalength; i++){
  //     if(this.ViewData[i].actual_time == -1){
  //       this.incompletearray.push(count++)
  //     }
  //   }

  // }

  dateChange(date: Date, templateVarialble: HTMLDivElement, approw: HTMLDivElement, incompleterow: HTMLDivElement) {    
    this.increment++;
    // if (this.increment % 2 == 1) {
    date = new Date(date.toISOString());
    let txtDate = date.getFullYear() + '-' + +(date.getMonth() + 1) + '-' + date.getDate()
    let newDate = { txtDate: txtDate };
    this.selectedDateYear = date.getFullYear();
    this.selectedDateMonth = this.bsValue.getMonth();
    this.selectedDateDate = this.bsValue.getDate();

    this.goalService.getGoal(newDate).
      subscribe(res => {
        this.ViewData = res;

        this.IncompleteGoals = this.ViewData.filter(function (data) {

          var goaldate: string = data.date;

          let datayear: any = goaldate.substring(0, 4);
          let datamonth: any = goaldate.substring(5, 7);
          let datadate: any = goaldate.substring(8, 10);
          let todayyear: any = date.getFullYear();
          let todaymonth: any = date.getMonth() + 1;
          let todaydate: any = date.getDate() - 1;

          if ((datayear <= todayyear) && (datamonth <= todaymonth) && (datadate <= todaydate)) {
            return (data.actual_time == -1)
          }

        });

        this.RemoveEmptyRow(approw);

        this.RemoveIncompleteGoal(incompleterow);

        this.RemoveLastDateRow(templateVarialble);

        this.SelectedDateData(templateVarialble);
        if(this.loadCounter == 0){
          this.Row();
        }
        this.loadCounter++;
        // this.ShowIncompleteGoals();
      });
    // }
  }
}