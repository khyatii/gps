import { Observable } from 'rxjs/Observable';
import { OthersService } from './../../../../services/others.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Url } from "../../../../common/serverurl.class";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {

  questionnaireForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  backgroundColor: {};

  constructor(private fb: FormBuilder, private route: Router, private http: Http,
    private othersService: OthersService, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.questionnaireForm = this.fb.group({
      'question': ['', Validators.required],
      'title': ['', Validators.required],
      'tags': ['', Validators.required],
    });
    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        {
          this.backgroundColor = {
            "background-color": state.counter,
            "color": "white"
          }
        }
      });
  }

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url = `${Url.url}/getSkills?q=${text}`;
    return this.http
      .get(url)
      .pipe(map(res => res.json()));
  };

  submit(formValues) {
    formValues.tags = this.convertSkillArrayToString(formValues.tags);
    this.othersService.postQuestion(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['pages/others/questionnaire']);
        }, 2000)
      } else {
        this.showError();
      }
    }, err => {
      this.showError();
    });
  }

  convertSkillArrayToString(value) {
    let arr = [];
    if (value == null) {
      value = [];
    }
    value.forEach(v => {
      arr.push(v.Name);
    });
    return arr.toString();
  }

  get question() {
    return this.questionnaireForm.controls.question
  }
  get title() {
    return this.questionnaireForm.controls.title
  }
  get tags() {
    return this.questionnaireForm.controls.tags
  }
  showSuccess() {
    window.scrollTo(500, 0);
    this.isSuccess = false;
    setTimeout(() => {
      this.isSuccess = true;
    }, 2000);
  }
  showError() {
    window.scrollTo(500, 0);
    this.isError = false;
    setTimeout(() => {
      this.isError = true;
    }, 2000);
  }
}
