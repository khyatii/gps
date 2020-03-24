import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
  inputs:[`inviteRefId`],
  outputs:[`childEvent`]
})
export class QualificationComponent implements OnInit {
  qualification : FormGroup;
  public inviteRefId :String; 
  backgroundColor:{};
  childEvent = new EventEmitter<any>();
  constructor(private fb:FormBuilder,private candidateService:CandidateRefService,private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    this.qualification = this.fb.group({
      'ClassX_Board':[ null ,Validators.required],
      'ClassX_Percentage':[ null,Validators.required],
      'ClassX_institue': [ null,Validators.required],
      'ClassX_YrOfPassing':[ null,Validators.required],
      'ClassXII_Board':[null,Validators.required],
      'ClassXII_institue': [ null,Validators.required],
      'ClassXII_Percentage': [null,Validators.required],
      'ClassXII_YrOfPassing':[null,Validators.required],
      'Graduation_Board':[null,Validators.required],
      'Graduation_institue': [ null,Validators.required],
      'Graduation_Percentage': [null,Validators.required],
      'Graduation_YrOfPassing':[null,Validators.required],
      'Masters_Board':[null],
      'Masters_institue': [ null,Validators.required],
      'Masters_Percentage': [null],
      'Masters_YrOfPassing':[null],
      'p_id':[null],
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

  userQualification(data){
    let parentId = localStorage.getItem('p_id')
    this.qualification.patchValue({
      p_id:parentId
    })
    this.candidateService.postQualification(this.qualification.value).subscribe(resp=>{
      console.log('response after posting qualification',resp);
    })
  }
  
  changePage(page){
    var pageName;
    if( page === 'back') pageName = 'basicInfo';
    if( page === 'next') pageName = 'skills';
    this.childEvent.emit(pageName);
  }
}
