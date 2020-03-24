import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';



@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  inputs:[`inviteRefId`],
  outputs:[`childEvent`]
})

export class BasicInfoComponent implements OnInit {
  user : FormGroup;
  public inviteRefId :String; 
  childEvent = new EventEmitter<any>();
  backgroundColor:{};
  bsValue;

  constructor(private fb:FormBuilder, private candidateService:CandidateRefService,private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    this.user = this.fb.group({
      'firstName':[ null ,Validators.required],
      'lastName':[ null,Validators.required],
      'email':[ null,[Validators.required,Validators.email]],
      'phone':[null,[Validators.required]],
      'dob': [null,Validators.required],
      'gender':[null,Validators.required],
      'referenceId':[null],
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
  
  dateChange(dates: Date, txtDob) {
    let date = new Date(dates);
    let newDate = date.getFullYear() + '-' + +(date.getMonth() + 1) + '-' + date.getDate()
    this.user.controls['dob'].setValue(newDate);
    txtDob.disabled = false;
  }
    
  userData(data){
    let parentId = localStorage.getItem('p_id')
    data.p_id = parentId;
    this.candidateService.postBasicInfo(this.user.value).subscribe(resp=>{
      this.childEvent.emit('qualification');
    })
  }
  
  get f() { return this.user.controls; }

}
