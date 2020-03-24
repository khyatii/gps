import { ViewChild, Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  @ViewChild('donut') donut: ElementRef;
  @ViewChild('bar') bar: ElementRef;
  @ViewChild('line') line: ElementRef;
  @ViewChild('area') area: ElementRef;
  backgroundColor:{}
  imageUrl : string = '';
  constructor(private ngRedux:NgRedux<IAppState>) { }
  isLoader : any;
  ngOnInit() {
    this.isLoader = false;
    this.chart('donut');
    this.chart('bar');
    this.chart('line');
    this.chart('area');
    this.isLoader = true;
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter
           }
         
       }
    })
  }  
  ngOnDestroy(){
    //this.isLoader = true;
  }

  downloadImg(e){
    let url_base64jp = this.donut.nativeElement.toDataURL("image/jpg");
    this.imageUrl = url_base64jp;
  }

  chart(val){
    let url_base64jp;
    let chartCtx;
    let chartType;
    let chartLegendPosition;
    let chartLegendFontSize;
    if(val == 'donut'){
      chartCtx = this.donut.nativeElement.getContext('2d');
      chartType = 'pie';
      chartLegendPosition = 'top';
      chartLegendFontSize = 15;
    }
    if(val == 'bar'){
      chartCtx = this.bar.nativeElement.getContext('2d');
      chartType = 'bar';
      chartLegendPosition = 'top';
      chartLegendFontSize = 14;
    }    
    if(val == 'line'){
      chartCtx = this.line.nativeElement.getContext('2d');
      chartType = 'line';
      chartLegendPosition = 'top';
      chartLegendFontSize = 14;
    }
    if(val == 'area'){
      chartCtx = this.area.nativeElement.getContext('2d');
      chartType = 'polarArea';
      chartLegendPosition = 'top';  
      chartLegendFontSize = 15;
    }        
    var data = {
      labels: [
          "Value A",
          "Value B",
          "Value C",
          "Value D"
      ],
      datasets: [
      {
          "data": [50, 20, 30, 40],   // Example data
          "backgroundColor": ["#FF7360", "#6FC8CE", "#FF6384", "#FFCE56"],
      }]
    };
    var chart = new Chart(
      chartCtx,
      {
        "type": chartType,
        "data": data,
        "options": {
            "cutoutPercentage": 50,
            "responsive": true,
            "animation": {
                "animateScale": true,
                "animateRotate": false
            },
            "tooltips": {
              "bodyFontSize": chartLegendFontSize,
              "bodyFontStyle": "bold",
              "bodyFontFamily": "'Helvetica', 'Arial', sans-serif",
            },
            "legend": {
              "position": chartLegendPosition,
              "labels": {
                "fontSize": chartLegendFontSize,
                "fontStyle": "bold",
              }
            }
        }
      }
    );
  }
}
