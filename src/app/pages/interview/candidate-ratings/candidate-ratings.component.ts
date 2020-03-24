import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray,FormControl} from '@angular/forms';
import { CandidateRefService } from './../../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../../store/reducer';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-candidate-ratings',
  templateUrl: './candidate-ratings.component.html',
  styleUrls: ['./candidate-ratings.component.css']
})
export class CandidateRatingsComponent implements OnInit {
  interviewId;
  candidateRatings : FormGroup;
  constructor(private fb:FormBuilder,private CandidateRefService:CandidateRefService,
  private ngRedux:NgRedux<IAppState>,private route: Router, private active: ActivatedRoute) { }

  ngOnInit() {

    this.active.params.subscribe(params=>{
      this.interviewId = params;
    })

    this.candidateRatings = this.fb.group({
      candidateRatingData: this.fb.array([this.initRows()]),
    })
  }

   initRows(){
    return this.fb.group({
      skill:[null,Validators.required],
      rating:[null,Validators.required],
      remarks:[null]
    })
  }

  addRow(){
    const control = <FormArray>this.candidateRatings.controls['candidateRatingData'];
    control.push(this.initRows());
  }

  userRatings(val){
    let data = {}
    data['id'] = this.interviewId.id
    data['ratings'] = val.candidateRatingData 
    this.CandidateRefService.saveCandidateRatings(data).subscribe(resp=>{
      this.route.navigate(['pages/interview']);
    })
  }

  back(){
    this.route.navigate(['pages/interview']);
  }

}
