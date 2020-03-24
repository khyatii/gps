import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-dashboard-comments',
  templateUrl: './dashboard-comments.component.html',
  styleUrls: ['./dashboard-comments.component.css'],
  animations: [
    trigger('CommentRight', [
      state('right', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 1, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
    ]),
  ]
})
export class DashboardCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  active=false;
  pending(){
    if(this.active == true){
      this.active = false;
    }
  }
  approved(){
    if(this.active == false){
      this.active = true;
    }
  }  
}
