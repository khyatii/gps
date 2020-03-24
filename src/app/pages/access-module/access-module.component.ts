import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PageService } from '../../services/pages.service';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { AccessManagementService } from '../../services/access-management.service';
import tableDragger from 'table-dragger';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';

@Component({
  selector: 'app-access-module',
  templateUrl: './access-module.component.html',
  styleUrls: ['./access-module.component.css']
})
export class AccessModuleComponent implements OnInit {
  accessModuleForm: FormGroup;
  moduleArray:Array<object>;
  userArray:Array<object>
  userRoles:Array<object>
  moduleList : FormArray;
  dragger : any;
  backgroundColor : {};
  constructor(private userservice:UserService,private pageService:PageService,private fb:FormBuilder,
    private accessService : AccessManagementService,private ngRedux:NgRedux<IAppState>){
    
  }
  
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
    
    this.accessModuleForm = this.fb.group({
      optModuleRoleId : ['', Validators.required],
      moduleList: this.fb.array([])
    })

    this.userservice.getRoles().subscribe(res=> {
      this.userRoles =res;
    })  
  }

  roleslected(data){
    var moduleId={
      roleId:data.optModuleRoleId,
    }
    this.accessService.getModule(moduleId).subscribe(res=> {
      console.log(res)
      this.init_drag(res);

      // setTimeout(function(){
        
      // },500)
    })
  }

  bindtable(res){
    return new Promise(resolve => {
      this.moduleArray=res;        
      let control = <FormArray>this.accessModuleForm.controls['moduleList'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
      }

      res.forEach(element => {
        this.moduleList = this.accessModuleForm.get('moduleList') as FormArray;
        this.moduleList.push(this.createItem());
      });
      setTimeout(()=>{
        resolve(res);
      },500)
    })
    
  }

  async init_drag(res){
    const value = await(this.bindtable(res));
    var el = document.getElementById('table');
    var dragger = tableDragger(el, {
      mode: 'row',
      dragHandler: '.handle',
      onlyBody: true,
      animation: 300
    });
    dragger.on('drop',(from, to,res)=>{
      this.sort_data(res.tBodies[0].rows);
    });
  }

  sort_data(tRows){
  //  for(let x in tRows){
  //    let firstTd = tRows[x].children[0];
  //    let module_id = firstTd.getElementsByTagName('input')[0].value;

  //    let secTd = tRows[x].children[1];
  //    let module_name = secTd.getElementsByTagName('input')[0].value;

  //    let lasttd = tRows[x].children[2];
  //    let is_permission = lasttd.getElementsByTagName('input')[0].getAttribute('ng-reflect-model');

  //  }
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: '',
      pages: '',
      is_permission: ''
    });
  }

  submit(values){
    let table = document.getElementById('table');
    let tRows = table['tBodies'][0].rows;
    let dataArr = [];
    for(let x = 0; x < tRows.length;x++){
      let firstTd = tRows[x].children[0];
      let module_id = firstTd.getElementsByTagName('input')[0].value;

      let secTd = tRows[x].children[1];
      let module_name = secTd.getElementsByTagName('input')[0].value;

      let lasttd = tRows[x].children[2];
      let is_permission = lasttd.getElementsByTagName('input')[0].getAttribute('ng-reflect-model');
      let obj ={
        id : module_id,
        pages : module_name,
        is_permission : is_permission,
        sort_order : x
      }
      dataArr.push(obj);
    }
    values.moduleList = dataArr;
    this.accessService.saveModules(values).subscribe(res =>{
      if(res['message'] == 'saved' || res['message'] == 'updated') {
        this.pageService.getSuccessMessage(false);
        this.accessService.getAcessStatus(true);
      }
      else this.pageService.getErrorMessage(false);
    })
  }
}
