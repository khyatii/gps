import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../store/reducer';
import { CandidateRefService } from '../services/candidate-ref.service';



@Component({
  selector: 'app-candidate-reference',
  templateUrl: './candidate-reference.component.html',
  styleUrls: ['./candidate-reference.component.scss']
})
export class CandidateReferenceComponent implements OnInit {
  user : FormGroup;
  basicHide = true;
  userQualification = true;
  userSkills = true;
  userExperience = true;
  userSocial = true;
  backgroundColor:{};
  DummyRefId:String;
  public childData:String;
  link = '';
  submitStatus ;

  constructor(private fb:FormBuilder,private ngRedux: NgRedux<IAppState>,
  private CandidateRefService:CandidateRefService){

  }

  userData(data){
    console.log('my data',data);
  }
  ngOnInit(){
    // this.link = window.location.href.split('=')[1];
    // this.CandidateRefService.postDecryptLink({'link':this.link}).subscribe(data=>{
    //   localStorage.setItem('p_id',data.pId);
    //   this.submitStatus = data.submit_status;
    // })
    // setTimeout(() => {
    //   this.DummyRefId = 'ItsDummyReferenceId'; //replace it with the right reference id when user gets in
    // }, 5000);

    // this.user = this.fb.group({
    //   'firstName':[ null ,Validators.required],
    //   'lastName':[ null,Validators.required],
    //   'email':[ null,[Validators.required,Validators.email]],
    //   'phone':[null,Validators.required],
    //   'dob': [null,Validators.required],
    //   'gender':[null,Validators.required]
    // })

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

    personal() {
      this.basicHide = true;
      this.userQualification = true;
      this.userSkills = true;
      this.userExperience = true;
      this.userSocial = true;
    }

    qualification(){
      this.basicHide = false;
      this.userQualification = false;
      this.userSkills = true;
      this.userExperience = true;
      this.userSocial = true;
    }

    skills(){
      this.basicHide = false;
      this.userQualification = true;
      this.userSkills = false;
      this.userExperience = true;
      this.userSocial = true;
    }

    experience(){
      this.basicHide = false;
      this.userQualification = true;
      this.userSkills = true;
      this.userExperience = false;
      this.userSocial = true;
    }

    social(){
      this.basicHide = false;
      this.userQualification = true;
      this.userSkills = true;
      this.userExperience = true;
      this.userSocial = false;
    }

    changeState($event){
      if( $event == 'basicInfo') this.personal();
      if( $event == 'qualification' ) this.qualification();
      if( $event == 'skills' ) this.skills();
      if( $event == 'workExperience' ) this.experience();
      if( $event == 'social' ) this.social();
    }

}
