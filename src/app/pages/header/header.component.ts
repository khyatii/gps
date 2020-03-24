import { element } from 'protractor';
import { Component, OnInit, Output,EventEmitter,Input} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { INCREMENT, USER_UPDATE_THEME } from '../../store/action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName : any;
  imagePath :string;
  counter:Observable<number>
  backgroundColor:{};
  constructor(private userservice:UserService,private imageService:ImageService,private ngRedux:NgRedux<IAppState>) { 

  }


  ngOnInit() {
    this.userName = localStorage.name;
    this.userservice.getProfileImage().subscribe(res=>{this.imagePath = res[0].image;})
    this.imageService.space.subscribe((val) => {
      this.imagePath=val;
    });
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {  
         if(state.counter != null){
          this.backgroundColor = {
            "background-color" : state.counter
          }
         }
         else{
          this.backgroundColor = {
            "background-color" : '#1c4561'
          }  
         }
           
       console.log(this.backgroundColor)
       }
    })
  }

  showSidebar:boolean=true;
  @Output('isOutput') isOutput=new EventEmitter();
  showbar(){
     this.isOutput.emit(this.showSidebar);
     this.showSidebar=!this.showSidebar;
  }
  @Input('isIn') isHeader:boolean;

  logout(){
    localStorage.clear();
  }

  color(elem){
    var style;
    style = getComputedStyle(elem);
    const actionChangeFirstName = {
      type: USER_UPDATE_THEME,
      Color: style.color
    }
    localStorage.setItem('primaryColor',style.color)
    this.ngRedux.dispatch(actionChangeFirstName)
  }
    
}
