import { Component, OnInit, EventEmitter } from '@angular/core';
import { CandidateRefService } from './../../services/candidate-ref.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import { TagModel } from 'ngx-chips/core/accessor';
import { Url } from "../../common/serverurl.class";
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/first';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  inputs: [`inviteRefId`],
  outputs: [`childEvent`]
})
export class SkillsComponent implements OnInit {
  demoskills = ['c', 'c++', 'java', 'angular', 'node', 'mongoDb', 'html', 'photoshop',
    'javascript', 'css', 'hadoop', 'R programming', 'kotlin', 'Flutter', 'Go'];
  skillsForm: FormGroup;
  backgroundColor: {};
  addedSkills = [];
  childEvent = new EventEmitter<any>();
  public inviteRefId: String;


  constructor(private http: Http, private candidateService: CandidateRefService,
    private fb: FormBuilder, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        {
          this.backgroundColor = {
            "background-color": state.counter
          }
        }
      })

    this.skillsForm = this.fb.group({
      "Skills": []
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

  nexPage(page,val) {
    var pageName;
    if (page == 'next') {
      let skillSelected = {}
      pageName = 'workExperience';
      skillSelected['parentId'] = localStorage.getItem('p_id');
      skillSelected['allskills'] = val;
      console.log('generated skills',skillSelected);
      this.candidateService.postSkills(skillSelected).subscribe(resp => {
        console.log('resp',resp);
        this.childEvent.emit(pageName);
      })

    }
    if (page == 'back'){
      pageName = 'qualification';
      this.childEvent.emit(pageName);
    } 
  }

  onKeyeve(val, ele) {
    let newval = val[val.length - 1];
    if (newval == ',') {
      let str = val.substring(0, val.length - 1);
      this.addedSkills.unshift(str);
      ele.value = ''
    }
  }

  skillsFormsubmit(val) {
   let userSkills = this.getStringval(val.Skills);
   this.nexPage('next',userSkills);
  }

  getStringval(val) {
    let s = '';
    val.forEach((o, i) => { s += o.Name; if (i !== val.length - 1) s += ','; });
    return s;
  }
}
