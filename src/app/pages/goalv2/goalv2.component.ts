import { Component, OnInit } from '@angular/core';
import * as MyModule from './dragula.min.js';
@Component({
  selector: 'app-goalv2',
  templateUrl: './goalv2.component.html',
  styleUrls: ['./goalv2.component.css']
})
export class Goalv2Component implements OnInit {

  constructor() { }
  todayYear: any;
  todayMonth: any;
  todayDate: any;
  bsValue: Date;
  isAddNew : boolean = true;
  addBox : any;
  entryBox : any;
  ngOnInit() {
    this.bsValue = new Date();
    let txtDate = this.bsValue.getFullYear() + '-' + +(this.bsValue.getMonth() + 1) + '-' + this.bsValue.getDate()
    let newDate = { txtDate: txtDate }
    this.todayYear = this.bsValue.getFullYear();
    this.todayMonth = this.bsValue.getMonth();
    this.todayDate = this.bsValue.getDate();
  }
    
  addEntry(){
    this.isAddNew = false;
  }
  dateChange(a){

  }


}
