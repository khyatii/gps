import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { PageService } from '../../services/pages.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private fb : FormBuilder, private RolesService : RolesService, private pageService : PageService,
    private ngRedux:NgRedux<IAppState>, private route : ActivatedRoute, private router : Router) { }
  roleArray : any;
  backgroundColor : {};
  ngOnInit() {
    //redux
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

    this.RolesService.getAllRoles().subscribe(data=>{
      //console.log(data)
      this.roleArray = data;
    })
  } 

  edit(values){
    // console.log(id)
    let id = values['id'];
    this.router.navigate(['/pages/roles/modify-roles',{id}])
  }
  
}
