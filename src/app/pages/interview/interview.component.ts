import { Component, OnInit } from '@angular/core';
import { CandidateRefService } from './../../services/candidate-ref.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';


@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})

export class InterviewComponent implements OnInit {
  interviewDetails = [];
  noInt = true;
  backgroundColor:{};
  constructor(private candidateService:CandidateRefService, private route: Router, private ngRedux:NgRedux<IAppState>,
  ) { }

  ngOnInit(){


    this.candidateService.getInterviewerDetails().subscribe(resp=>{
  
      console.log(resp)
      this.interviewDetails = resp;
      if(resp.length > 0) this.noInt = false;
    })

    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
      {
        this.backgroundColor = {
          "background-color": state.counter,
          "color":'white'
        }
      }
    })
  }

  declineInterview(interviewId,index){
    let obj ={ id:interviewId };
    this.candidateService.rejectInterview(obj).subscribe(resp=>{
      if(resp){
        this.interviewDetails.splice(index,1);
      } 
    })
  }

  rateCandidate(id){
    this.route.navigate(['pages/interview/rateCandidate/',id]);
  }

}
