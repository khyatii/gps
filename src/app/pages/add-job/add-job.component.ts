import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateRefService } from '../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Url } from "../../common/serverurl.class";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  PostNewJob: FormGroup;
  AddjobTypes = [];
  backgroundColor = {};
  skills = [];
  jobTypes = ['Fresher', 'Full Time', 'Part Time', 'Internship', 'Contract'];
  constructor(private fb: FormBuilder, private CandidateRefService: CandidateRefService,
    private ngRedux: NgRedux<IAppState>, private http: Http,private route:Router) { }

  ngOnInit() {

    this.PostNewJob = this.fb.group({
      'jobTitle': [null, Validators.required],
      'company': [null, Validators.required],
      'location': [null, Validators.required],
      'experience': [null, Validators.required],
      'roleandResp': [null, Validators.required],
      'jd': [null, Validators.required],
      'salaryFrom': [null, Validators.required],
      'salaryTo': [null, Validators.required],
      'salaryD': [null, Validators.required],
      'skills': [null, Validators.required],
      'experience_D': [null, Validators.required],
      'vacancy': [null, Validators.required]
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

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    // debugger;
    // console.log(Url.url + '/getSkills?q=' + text); 
    const url = `${Url.url}/getSkills?q=${text}`;
    return this.http
      .get(url)
      .pipe(map(res => res.json()));
  };

  onKeyeve(v, ele) {
    let l = v.length;
    let last = v.substring(l - 1);
    if (last == ',') {
      let s = v.substring(0, l - 1);
      this.skills.push(s);
      ele.value = '';
    }
  }

  removeSkill(s) {
    let i = this.skills.indexOf(s);
    if (i >= 0) this.skills.splice(i, 1);
  }

  newjobTypes(e, i) {
    let ti = this.AddjobTypes.indexOf(this.jobTypes[i]);
    if (ti < 0) {
      e.srcElement.style.background = 'red';
      this.AddjobTypes.push(this.jobTypes[i]);
    } else {
      e.srcElement.style.background = '#20a8d8';
      this.AddjobTypes.splice(ti, 1);
    }
  }

  newjob(val) {
    let str = this.getStringval(val.skills);
    val.skills = str;
    val['jobTypes'] = this.AddjobTypes;
    this.CandidateRefService.postJobs(val).subscribe(resp => {
      this.route.navigate(['/pages/job-listings']);
    })
  }


  getStringval(val) {
    let s = '';
    val.forEach((o, i) => { s += o.Name; if (i !== val.length - 1) s += ','; });
    return s;
  }


}
