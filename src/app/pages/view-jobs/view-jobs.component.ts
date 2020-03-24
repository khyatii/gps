import { Component, OnInit } from '@angular/core';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
  allJobs = []

  constructor(private CandidateRefService: CandidateRefService, private route: Router) { }

  ngOnInit() {
    this.CandidateRefService.viewJobs().subscribe(resp =>{
     this.allJobs = resp;
    })
  }
  
  referJob(id){
    this.route.navigate(['/pages/invite-candidiate/',id]);
  }

}
