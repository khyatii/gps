import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-dashboard-status',
  templateUrl: './dashboard-status.component.html',
  styleUrls: ['./dashboard-status.component.css'],
  animations: [
    trigger('DashboardDown', [
      state('down', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 1, transform: 'translateY(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
    ]),
  ]
})
export class DashboardStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
