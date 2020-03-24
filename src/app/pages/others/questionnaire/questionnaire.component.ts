import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OthersService } from './../../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  p: number = 1;
  questionArray = [];
  questionnaireForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  userId;
  likesStatus = [];
  commentsArray = [];
  backgroundColor: {};

  constructor(private othersService: OthersService, private route: Router, private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder, private userservice: UserService) { }

  ngOnInit() {
    this.questionnaireForm = this.fb.group({
      'comments': [''],
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
    this.othersService.viewQuestionnaire().subscribe(res => {
      this.questionArray = res.data;
    });

    this.othersService.countComments().subscribe(res => {
      if (res.data.length == 0) {
        this.commentsArray = [{ count: 0, questionnaire_id: 1 }];
      } else {
        this.commentsArray = res.data;
      }
    });

    this.othersService.countLikesStatus().subscribe(res => {
      if (res.data.length == 0) {
        this.likesStatus = [{ count: 0, question_id: 1 }];
      } else {
        this.likesStatus = res.data;
      }
    });

    this.userservice.getLoginUser().subscribe(res => {
      this.userId = res[0].id;
    });
  }

  delete(objData, index) {
    var id = objData.id;
    let value = { id };
    if (confirm(`Are you sure to delete this Question ?`)) {
      this.othersService.deleteQuestionnaire(value).subscribe(dataany => {
        this.questionArray.splice(index, 1);
      })
    }
  }
  edit(objData) {
    let id = objData.id;
    this.route.navigate(['/pages/others/modify-question', { id }]);
  }
  view(id) {
    this.route.navigate(['/pages/others/view-questionnaire', { id }]);
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
