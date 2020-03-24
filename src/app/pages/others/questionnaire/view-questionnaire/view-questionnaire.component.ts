import { OthersService } from './../../../../services/others.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {

  p: number = 1;
  questionArray = [];
  commentsArray = [];
  questionnaireForm: FormGroup;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  userId;
  likesStatus = [];
  value: any;
  totalLikes: any;
  backgroundColor: {};

  constructor(private othersService: OthersService, private route: Router, private router: ActivatedRoute,
    private fb: FormBuilder, private userservice: UserService, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.questionnaireForm = this.fb.group({
      'comments': ['', Validators.required],
    });
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
    this.othersService.viewOneQuestionnaire(this.value).subscribe(res => {
      this.questionArray = res.data;
    });

    this.othersService.likesCount(this.value).subscribe(res => {
      let likeCount = 0, dislikeCount = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].like_counts != null) {
          likeCount = likeCount + parseInt(res.data[i].like_counts);
        }
        if (res.data[i].dislike_counts != null) {
          dislikeCount = dislikeCount + parseInt(res.data[i].dislike_counts);
        }
      }
      this.totalLikes = likeCount + dislikeCount;
    });

    this.othersService.viewLikesStatus(this.value).subscribe(res => {
      if (res.data.length == 0) {
        this.likesStatus = [{ id: 1, likes_status: 0, dislikes_status: 0 }];
      } else {
        this.likesStatus = res.data;
      }
    });

    this.othersService.viewComments().subscribe(res => {
      this.commentsArray = res.data;
    });

    this.userservice.getLoginUser().subscribe(res => {
      this.userId = res[0].id;
    });
  }

  submit(formValues, data) {
    formValues.id = data;
    this.othersService.postComments(formValues).subscribe(res => {
      if (res.data.message == 'saved') {
        this.showSuccess();
        setTimeout(() => {
          this.route.navigate(['/pages/others/questionnaire']);
          // window.location.reload();
        }, 2000);
      } else {
        this.showError();
      }
    }, err => {
      this.showError();
    });
  }

  like(objData, likeData, view) {
    let count;
    if (likeData.like_counts == null) {
      likeData.like_counts = 0;
      count = 0 + 1;
    } else {
      count = parseInt(likeData.like_counts) + 1;
    }

    let div = document.createElement('div');
    let like = document.createElement('div');
    div.innerHTML = `<i class="fa fa-thumbs-up" style="font-size: 24px;margin: 0px 5px 0px 0px;"
                      (click)="unlike(data,lk,view)" *ngIf="(lk.likes_status=='1') "
                      aria-hidden="true" title="Unlike"></i>`;
    like.innerHTML = `<label style="font-size: 17px;font-weight: 400;color: #000;">${this.totalLikes + 1}</label>`
    view.childNodes[2].replaceWith(div);
    view.childNodes[6].replaceWith(like);
    let val = { count: count, data: objData, likes_status: 1 } //likes_status 1=true,0=false
    this.othersService.updateLikes(val).subscribe(res => { })
  }
  unlike(objData, likeData, view) {
    let count = parseInt(likeData.like_counts) - 1;

    let div = document.createElement('div');
    let like = document.createElement('div');
    div.innerHTML = `<i class="fa fa-thumbs-o-up" style="font-size: 24px;margin: 0px 5px 0px 0px;"
                      (click)="like(data,lk,view)" *ngIf="(lk.likes_status=='0' || lk.likes_status==undefined) "
                      aria-hidden="true" title="Like"></i>`;
    like.innerHTML = `<label style="font-size: 17px;font-weight: 400;color: #000;">${this.totalLikes - 1}</label>`
    view.childNodes[4].replaceWith(div);
    view.childNodes[6].replaceWith(like);

    let val = { count: count, data: objData, likes_status: 0 }
    this.othersService.updateLikes(val).subscribe(res => { })
  }
  dislike(objData, likeData, view) {
    let count;
    if (likeData.dislike_counts == null) {
      likeData.dislike_counts = 0;
      count = 0 - 1;
    } else {
      count = parseInt(likeData.dislike_counts) - 1;
    }

    let div = document.createElement('div');
    let like = document.createElement('div');
    div.innerHTML = `<i class="fa fa-thumbs-down" style="font-size: 24px;margin: 0px 0px 0px 6px;"
                      (click)="disunlike(data,lk,view)" *ngIf="(lk.dislikes_status=='1') "
                      aria-hidden="true" title="DisUnlike"></i>`;
    like.innerHTML = `<label style="font-size: 17px;font-weight: 400;color: #000;">${this.totalLikes - 1}</label>`
    view.childNodes[9].replaceWith(div);
    view.childNodes[6].replaceWith(like);

    let val = { count: count, data: objData, dislikes_status: 1 } //dislikes_status 1=true,0=false
    this.othersService.updateDisLikes(val).subscribe(res => { })
  }
  disunlike(objData, likeData, view) {
    let count = parseInt(likeData.dislike_counts) + 1;
    let div = document.createElement('div');
    let like = document.createElement('div');
    div.innerHTML = `<i class="fa fa-thumbs-o-down" style="font-size: 24px;margin: 0px 0px 0px 6px;"
                      (click)="dislike(data,lk,view)" *ngIf="(lk.dislikes_status=='0' || lk.dislikes_status==undefined) "
                      aria-hidden="true" title="Dislike"></i>`;
    like.innerHTML = `<label style="font-size: 17px;font-weight: 400;color: #000;">${this.totalLikes + 1}</label>`
    view.childNodes[11].replaceWith(div);
    view.childNodes[6].replaceWith(like);

    let val = { count: count, data: objData, dislikes_status: 0 }
    this.othersService.updateDisLikes(val).subscribe(res => { })
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
