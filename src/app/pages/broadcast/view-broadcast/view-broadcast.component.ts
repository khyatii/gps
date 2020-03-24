import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OthersService } from '../../../services/others.service';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.css']
})
export class ViewBroadcastComponent implements OnInit {

  broadCastingForm: FormGroup;
  emailHide: boolean = true;
  smsHide: boolean = true;
  backgroundColor: {};
  value;

  constructor(private ngRedux: NgRedux<IAppState>, private fb: FormBuilder,
    private othersService: OthersService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.value = { id: this.router.snapshot.params['id'] }
    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        this.backgroundColor = {
          "background-color": state.counter
        }
      });
    this.broadCastingForm = this.fb.group({
      'subject': ['', Validators.required],
      'description': [''],
      'text': ['']
    });
    this.othersService.getOneBroadcast(this.value).subscribe(res => {
      if (res.data[0].type == 'email') {
        this.subject.setValue(res.data[0].subject);
        this.broadCastingForm.controls['description'].setValue(res.data[0].description);
        // this.description.setValue();
        this.emailHide = true;
        this.smsHide = true;
      } else {
        this.text.setValue(res.data[0].description);
        this.emailHide = false;
        this.smsHide = false;
      }
    });
  }

  get subject() {
    return this.broadCastingForm.controls.subject
  }
  get description() {
    return this.broadCastingForm.controls.description
  }
  get text() {
    return this.broadCastingForm.controls.text
  }

}
