import { Component, OnInit,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray,FormControl} from '@angular/forms';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
  inputs:[`inviteRefId`],
  outputs:[`childEvent`]
})
export class WorkExperienceComponent implements OnInit {
  isExperienced = false;
  workExperience : FormGroup;
  isExp = false;
  noexp=false;
  childEvent = new EventEmitter<any>(); 
  myDateValue:Date;
  noExp = false;
  backgroundColor:{};
  public inviteRefId :String; 


  constructor(private fb:FormBuilder,private CandidateRefService:CandidateRefService,
  private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
     this.myDateValue = new Date();
    this.workExperience = this.fb.group({
      itemRows: this.fb.array([this.initItemRow()]),
    })
    
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
      {
        this.backgroundColor = {
          "background-color": state.counter
        }
      }
    })
  }

  initItemRow(){
    return this.fb.group({
      companyName:[null,Validators.required],
      fromDate:[null,Validators.required],
      toDate:[null,Validators.required],
      designation:[null,Validators.required],
      location:[null,Validators.required]
    })
  }

  userworkExp(){ 
    this.isExperienced = true;
    this.isExp = false;
  }

  userNoWorkExp(){
    this.isExperienced = false;
  }

  dateChange(dates,box,index){
    let date = new Date(dates);
    let newDate = date.getFullYear() + '-' + +(date.getMonth() + 1) + '-' + date.getDate()
    box.value = newDate;
  }

  addRow(){
    const control = <FormArray>this.workExperience.controls['itemRows'];
    control.push(this.initItemRow());
  }

  removeRow(index){
    let dataArray = this.workExperience.controls['itemRows']['controls']; 
    dataArray.splice(index,1);
    if(dataArray.length < 1){
      this.userNoWorkExp();
      this.noExp = true;
    } 
  }

  userExperience(val){
    let data={}
    data['exp'] = val;
    data['p_id'] = localStorage.getItem('p_id');
    this.CandidateRefService.postExperience(data).subscribe(resp=>{
      this.nexPage('next');
    })
  }
  
  nexPage(page){
    var pageName;
    if( page == 'next' ) pageName = 'social';
    if( page == 'back' ) pageName = 'skills';
    this.childEvent.emit(pageName);
  }

}
