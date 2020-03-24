import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../../../services/roles.service';
import { PageService } from '../../../services/pages.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {

  constructor(private fb : FormBuilder, private RolesService : RolesService, private pageService : PageService,
    private route : Router,private ngRedux:NgRedux<IAppState>) { }
  roleForm : any;
  isError : boolean = false;
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
    
    this.roleForm = this.fb.group({
      txtRole : ['',Validators.required],
      txtDesc : []
    })
  }

  get txtRole(){
    return this.roleForm.controls.txtRole;
  }  

  roleKey(){    
    this.isError = false;
  }

  submit(values){
    console.log(values)
    this.RolesService.saveData(values).subscribe(res=>{
      this.pageService.getSuccessMessage(false);
      this.roleForm.reset();
      this.route.navigate(['/pages/roles']);
    },
    err => {
      this.isError = true;
    })
  }

}
