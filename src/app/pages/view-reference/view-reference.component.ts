import { Component, OnInit } from '@angular/core';
import { CandidateRefService } from './../../services/candidate-ref.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../store/reducer';


@Component({
  selector: 'app-view-reference',
  templateUrl: './view-reference.component.html',
  styleUrls: ['./view-reference.component.css']
})
export class ViewReferenceComponent implements OnInit {
  candidateRequests;
  backgroundColor:{};
  listingType;

  constructor(private CandidateRefService:CandidateRefService, private route: Router,
  private ngRedux:NgRedux<IAppState>) { }

  ngOnInit(){

    this.Allref();
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

  viewResume(cv){
    alert(cv);
  }

  declineRequest(refId,index){ 
    let declineId = { declineRef:refId };
    this.CandidateRefService.declineReference(declineId).subscribe(resp=>{
      this.candidateRequests.splice(index,1);
    })  
  }

  holdRequest(refId,index){
    let holdRefId = { holdRef: refId }
     this.CandidateRefService.holdReference(holdRefId).subscribe(resp=>{
       this.candidateRequests.splice(index,1);
    }) 
  }

  proceedRequest(refId,index){
    this.route.navigate(['pages/view-reference/proceedRefid/',refId]);
  }

  newRef(){
    this.CandidateRefService.getNewReferences().subscribe(resp=>{
      this.candidateRequests = resp;
      this.listingType = 'N'      
    })
  }

  completedRef(){
    this.CandidateRefService.getCompletedRef().subscribe(resp=>{
      this.candidateRequests = resp;
      this.listingType = 'C'
    })
  }

  declinedRef(){
    this.CandidateRefService.getdeclinedRef().subscribe(resp=>{
      this.candidateRequests = resp;
      this.listingType = 'D'
    })
  }

  holdRef(){
    this.CandidateRefService.getHoldRef().subscribe(resp=>{
      this.candidateRequests = resp;
      this.listingType = 'H'
    })
  }

  Allref(){
    this.CandidateRefService.getAllRef().subscribe(allref =>{
      this.candidateRequests = allref;
      console.log('this.candidateRequests',this.candidateRequests);
      this.listingType = 'A';
    })
  }

  viewRatings(refId){
     this.route.navigate(['pages/view-reference/candidateRatings/',refId]);   
  }  
}
