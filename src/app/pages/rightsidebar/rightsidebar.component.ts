import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})
export class RightsidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('isInput') isHide:boolean;
 
 
  active=false;
  hideBar(){
    this.isHide = !this.isHide;
  }
  users(){
    if(this.active == true){
      this.active = false;
    }
  }
  alerts(){
    if(this.active == false){
      this.active = true;
    }
  } 
}
