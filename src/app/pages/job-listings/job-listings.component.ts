import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { CandidateRefService } from '../../services/candidate-ref.service';


@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css']
})
export class JobListingsComponent implements OnInit {
  allJobs = [];
  backgroundColor = {};
  constructor(private ngRedux: NgRedux<IAppState>, private candidateService: CandidateRefService) { }

  ngOnInit() {
    this.candidateService.getAllJobs().subscribe(resp => {
      this.allJobs = resp;
    })

    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        {
          this.backgroundColor = {
            "background-color": state.counter,
            'color': 'white'
          }
        }
      })
  }

  changejstatus(id, status) {
    this.candidateService.changeJobStatus({ jid: id, jstatus: status }).subscribe(resp => {
      this.ngOnInit();
    })                                                                                                                      
  }

}
