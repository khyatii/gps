import { Component, OnInit, ViewChild, ElementRef,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray,FormControl} from '@angular/forms';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';


@Component({
  selector: 'app-social-contacts',
  templateUrl: './social-contacts.component.html',
  styleUrls: ['./social-contacts.component.css'],
  inputs:[`inviteRefId`],
  outputs:[`childEvent`]
})
export class SocialContactsComponent implements OnInit {
  socialForm : FormGroup;
  myFile:File;
  childEvent = new EventEmitter<any>(); 
  public inviteRefId :String; 
  backgroundColor:{};


  @ViewChild('resumee') resumee: ElementRef;
  constructor(private fb:FormBuilder, private candidateService:CandidateRefService,
  private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    this.socialForm = this.fb.group({
      'githubProfile':[null],
      'linkedinProfile':[ null],
      'fbProfile':[ null],
      'twitterProfile':[null],
      'resume': [null,Validators.required],
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

 
  userSocialData(data){
    const sampleFile = this.resumee.nativeElement;
    if( sampleFile.files && sampleFile.files[0]){
      this.myFile = sampleFile.files[0]
    }
    const filecheck:File = this.myFile;
    const formData:FormData = new FormData();
    formData.append('github',data.githubProfile)
    formData.append('linkedin',data.linkedinProfile)
    formData.append('facebook',data.fbProfile)
    formData.append('twitter',data.twitterProfile)
    formData.append('resume', this.myFile,this.myFile.name);
    
    this.candidateService.postSocial(formData).subscribe(data=>{
      if(data) {
        alert('thanx your details have been submitted');
        this.ngOnInit()
      }
    },err=>{
      alert('some error occured');
    })
  }

  getBack(){
    this.childEvent.emit('workExperience');
  }

}
