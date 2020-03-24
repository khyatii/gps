import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';
import { INCREMENT, USER_UPDATE_THEME } from '../../../store/action';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  usersArray = [];

  constructor(private userService: UserService, private route: Router,private ngRedux:NgRedux<IAppState>) { }
  p: number = 1;
  isTable : boolean = false;
  backgroundColor:{};
  ngOnInit() {
    this.getData();
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter,
              "color" : "white"
           }
       }
    })
  }

  getData(){
    this.userService.getCompanyUsers().subscribe(res => {
      this.usersArray = res;
    });
  }

  delete(objData, index) {
    var id = objData.id;
    let value = { id };
    if (confirm(`Are you sure to delete User ` + objData.first_name + ` ?`)) {
      this.userService.deleteUser(value).subscribe(dataany => {
        this.getData();
      })
    }
  }

  edit(objData) {
    let id = objData.id;
    this.route.navigate(['/pages/update-profile/user/profileDetail', { id }]);
  }
}
