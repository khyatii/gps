import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store/reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loading : boolean = true;

  constructor(private ngRedux:NgRedux<IAppState>){}
  loader;
  backgroundColor : string;
  ngOnInit(){
    //redux
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
          this.loading = state.loader;
          if(state.counter != null){
            this.backgroundColor = state.counter;
           }
           else{
            this.backgroundColor =  '#1c4561';
          }
       }
    })
  }
}
