import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';
import { RolesService } from '../../../services/roles.service';
import { PageService } from '../../../services/pages.service';

@Component({
  selector: 'app-modify-role',
  templateUrl: './modify-role.component.html',
  styleUrls: ['./modify-role.component.css']
})
export class ModifyRoleComponent implements OnInit {

  constructor(private fb : FormBuilder, private route : ActivatedRoute,private ngRedux:NgRedux<IAppState>,
    private roleService: RolesService, private pageService : PageService, private router : Router) { }
  dataId : number;
  roleForm : any;
  backgroundColor : {};
  isError : boolean = false;
  roleData : any;
  value : boolean = false;

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

    this.dataId = this.route.snapshot.params['id']
    this.getRoleInfo(this.dataId);    
  }

  getRoleInfo(id){
    this.roleService.getRoleInfo(id).subscribe(res=>{
      if(res.length > 0){
        this.roleData = res[0];
        this.roleForm = this.fb.group({
          'txtRole' : [this.roleData.name,Validators.required],
          'txtDesc' : [this.roleData.des]
        })        
      }    
      else{
        this.roleForm = this.fb.group({
          'txtRole' : ['',Validators.required],
          'txtDesc' : []
        })  
      } 
      this.value = true; 
    })
  }

  get txtRole(){
    return this.roleForm.controls.txtRole;
  }

  roleKey(){    
    this.isError = false;
  }

  submit(values){
    values.id = this.dataId;
    this.roleService.updateData(values).subscribe(res=>{
      this.pageService.getSuccessMessage(false);
      this.router.navigate(['/pages/roles'])
    },
    err=>{
      this.pageService.getErrorMessage(false);
    })
  }
}
