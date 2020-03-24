import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private pageService:PageService) { }
  isSuccess = true;
  isError = true;
  isIndex=true;

  ngOnInit() {
    this.pageService.successStatus.subscribe(status => {
      this.isSuccess = status;
      setTimeout(() => {
        this.pageService.getSuccessMessage(true);
      }, 5000);
    })
    this.pageService.errorStatus.subscribe(status => {
      this.isError = status;
      setTimeout(() => {
        this.pageService.getSuccessMessage(true);
      }, 4000);
    })
  }

  isInput:boolean=false;
  show(e){
    this.isInput=e;
  }
  isSelected:boolean=true;
  side(e){
    this.isSelected=!e;
  }

  
}
