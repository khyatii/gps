import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-dashboard-quick-actions',
  templateUrl: './dashboard-quick-actions.component.html',
  styleUrls: ['./dashboard-quick-actions.component.css'],
  animations: [
    trigger('QuickActionLeft', [
      state('left', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 1, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
    ]),
  ]
})
export class DashboardQuickActionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  active=false;
  pending(){
    if(this.active == true){
      this.active = false;
    }
  }
  completed(){
    if(this.active == false){
      this.active = true;
    }
  }  

}
