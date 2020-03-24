import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CandidateRefService } from './../../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import {IAppState} from '../../../store/reducer';

@Component({
  selector: 'app-candidate-ratings',
  templateUrl: './candidate-ratings.component.html',
  styleUrls: ['./candidate-ratings.component.css']
})
export class CandidateRatingsComponent implements OnInit {
  referenceId;
  candidateData;
  ratingsData;
  backgroundColor:{};
  constructor(private route: Router, private activeRoute: ActivatedRoute,
  private ngRedux:NgRedux<IAppState>, private candidateService: CandidateRefService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.referenceId = params;
    })

    this.candidateService.getCandidateRatings(this.referenceId).subscribe(resp=>{
      this.candidateData = resp.candidate[0];
      this.ratingsData = resp.ratings;
    })

    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
      {
        this.backgroundColor = {
          "background-color": state.counter,
          'color' :'white'
        }
      }
    })
  }

  showRefList(){
    this.route.navigate(['pages/view-reference']);
  }


}
