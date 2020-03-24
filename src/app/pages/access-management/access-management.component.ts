import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PageService } from '../../services/pages.service';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { AccessManagementService } from '../../services/access-management.service';
import tableDragger from 'table-dragger';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { LOADER } from '../../store/action';

@Component({
  selector: 'app-access-management',
  templateUrl: './access-management.component.html',
  styleUrls: ['./access-management.component.css']
})
export class AccessManagementComponent implements OnInit {

  userArray:Array<object>
  userRoles:Array<object>
  pagesArray:Array<object>
  moduleArray:Array<object>
  optionsModel: number[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  accessForm:FormGroup;
  dataList : FormArray;
  selModuleId : string;
  backgroundColor : {};

  constructor(private userservice:UserService,private pageService:PageService,private fb:FormBuilder,
    private accessService : AccessManagementService,private ngRedux:NgRedux<IAppState>){
    
  }

  ngOnInit(){    
    //redux
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter,
              "color" : "white"
           }
       console.log(state)
       }
    })

    // const loaderAction = {
    //   type: LOADER,
    //   loader: true
    // }
    // this.ngRedux.dispatch(loaderAction)
    
    this.pageService.getModule().subscribe(res=> {  // get all modules 
      this.moduleArray=res;
    })  
    
    this.accessForm = this.fb.group({ // form validation
      optRoleId : ['', Validators.required],
      optModuleId : ['', Validators.required],
      dataList: this.fb.array([])
    })   

    this.userservice.getRoles().subscribe(res=> {   // get all roles 
      this.userRoles =res;
    })           
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: '',
      pages: '',
      is_permission: ''
    });
  }

  trackByFn(index, item) {
    this.selectedItems=[]
    return index;  
  }

  roleSelected(data){
    var post={
      roleId:data.optRoleId,
    }
    this.accessService.getRoleAccessedModules(post).subscribe(res=> {
      this.moduleArray=res;
    })
  }
 
  moduleSelected(data,e,y){
    this.selModuleId = e.target.selectedOptions[0].getAttribute('modulerole');
    //const value:number =  parseInt((<HTMLSelectElement>a.srcElement).value);
    var moduleId={
      moduleId:data.optModuleId,
      roleId:data.optRoleId,
      moduleRoleId : this.selModuleId
    }
    this.pageService.getPages(moduleId).subscribe(res=> {
      this.pagesArray=res;  
      this.selectedItems=[];
      
      let control = <FormArray>this.accessForm.controls['dataList'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
      }

      res.forEach(element => {
        this.dataList = this.accessForm.get('dataList') as FormArray;
        this.dataList.push(this.createItem());
      });
      setTimeout(function(){
        var el = document.getElementById('table');
        var dragger = tableDragger(el, {
          mode: 'row',
          dragHandler: '.handle',
          onlyBody: true,
          animation: 300
        });
        dragger.on('drop',function(from, to){
          console.log(from);
          console.log(to);
        });
      },500)
      
      })
  }
  
  // submit form values
  submit(form){
    let table = document.getElementById('table');
    let tRows = table['tBodies'][0].rows;
    let dataArr = [];
    for(let x = 0; x < tRows.length;x++){
      let firstTd = tRows[x].children[0];
      let page_id = firstTd.getElementsByTagName('input')[0].value;

      let secTd = tRows[x].children[1];
      let pagee_name = secTd.getElementsByTagName('input')[0].value;

      let lasttd = tRows[x].children[2];
      let is_permission = lasttd.getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
      let obj ={
        id : page_id,
        pages : pagee_name,
        is_permission : is_permission,
        sort_order : x
      }
      dataArr.push(obj);
    }
    form.dataList = dataArr;
    form.optModuleId =  this.selModuleId;
    this.accessService.saveData(form).subscribe(res =>{
      if(res['message'] == 'saved' || res['message'] == 'updated'){
        this.pageService.getSuccessMessage(false);
        this.accessService.getAcessStatus(true);
      } 
      else this.pageService.getErrorMessage(false);
    })
  }

 
}
