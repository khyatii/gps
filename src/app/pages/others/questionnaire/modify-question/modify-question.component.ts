import { Observable } from 'rxjs/Observable';
import { OthersService } from './../../../../services/others.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Url } from "../../../../common/serverurl.class";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-modify-question',
  templateUrl: './modify-question.component.html',
  styleUrls: ['./modify-question.component.css']
})
export class ModifyQuestionComponent implements OnInit {

  questionnaireForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  value;
  backgroundColor: {};

  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute,
    private othersService: OthersService, private http: Http, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }
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
    this.questionnaireForm = this.fb.group({
      'question': ['', Validators.required],
      'title': ['', Validators.required],
      'tags': ['', Validators.required],
    });
    this.othersService.getOneQuestion(this.value).subscribe(res => {
      this.questionnaireForm.controls['question'].setValue(res.data[0].question);
      this.title.setValue(res.data[0].title);
      let tag = this.convertStringToArray(res.data[0].tags);
      this.questionnaireForm.controls['tags'].setValue(tag);
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
    formValues.id = this.value.id;
    this.othersService.updateQuestion(formValues).subscribe(res => {
      if (res.data.message == 'updated') {
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
  convertStringToArray(value) {
    value = value.split(',');
    let arr = [];
    value.forEach(v => {
      let obj = {};
      obj['Name'] = v;
      arr.push(obj);
    });
    return arr;
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
