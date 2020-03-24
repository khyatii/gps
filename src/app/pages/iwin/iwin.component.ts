import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iwinService } from "../../services/iwin.service";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';

@Component({
  selector: 'app-iwin',
  templateUrl: './iwin.component.html',
  styleUrls: ['./iwin.component.css']
})
export class IwinComponent implements OnInit {
  usersignupform: any;
  div_add_box: string;
  div_table_box: string;
  messageValue: string;
  alertBoxDiv: string = 'hide';
  iwinForm: FormGroup;
  dataArray: any;
  txtDate: any;
  user_name
  public showloader: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  p: number = 1;
  rolesArray = [];
  usersArray = [];
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  backgroundColor : {};

  constructor(private fb: FormBuilder, private iwinService: iwinService, private route: Router,
    private userservice: UserService, private ngRedux:NgRedux<IAppState>) { }

  ngOnInit() {
    //redux
    this.ngRedux
    .select(state => state) // select the entire state
    .subscribe(state => {
       {
           this.backgroundColor = {
              "background-color" : state.counter,
              "color" : "white"
           }
       }
    })

    this.div_add_box = 'hide';
    this.div_table_box = 'show';
    this.fetchRecords();
    this.iwinForm = this.fb.group({
      'title': ['', Validators.required],
      'roles': ['', Validators.required],
      'staffId': ['', Validators.required],
      //'date': ['', Validators.required],
      'category': ['', Validators.required],
      'desc': ['']
    });
    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
  }

  save(value) {
    let todayDate = new Date();
    value.date = todayDate.toLocaleDateString();
    //value.date = this.txtDate;
    value.user_name = this.user_name;
    this.iwinService.saveData(value).subscribe(res => {
      if (res.data == 1) {
        this.showSuccessMessage();
        this.messageValue = "Saved SuccessFully";
        this.div_add_box = 'hide';
        this.div_table_box = 'show';
        this.fetchRecords();
      }
    })
  }

  // reset(){
  //   this.iwinForm.reset();
  // }

  delete(objData, index) {
    var id = objData.id;
		let value = { id };
		if (confirm(`Are you sure to delete iwin ` + objData.title + ` ?`)) {
			this.iwinService.deleteIwin(value).subscribe(dataany => {
				this.dataArray.splice(index, 1);
			})
		}
  }
  roleSelected(data) {
    let value = { roleId: data._value }
    this.userservice.getUserRoles(value).subscribe(res => {
      this.usersArray = res.data;
    });
  }
  userSelected(data) {
    this.userservice.getUserData(data._value).subscribe(res => {
      this.user_name = res[0].first_name + " " + res[0].last_name;
    });
  }
  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + ("0" + event.date.month).slice(-2) + "-" + ("0" + event.date.day).slice(-2)
  }
  showDivBox() {
    if (this.div_add_box == 'hide') {
      this.div_add_box = 'show';
      this.div_table_box = 'hide';
    }
    else if (this.div_add_box == 'show') {
      this.div_add_box = 'hide';
      this.div_table_box = 'show';
    }
  }

  editRow(id) {
    this.route.navigate(['/pages/iwin/modify-iwin', { id }]);
  }

  get title() {
    return this.iwinForm.controls.title
  }
  get roles() {
    return this.iwinForm.controls.roles
  }
  get staffId() {
    return this.iwinForm.controls.staffId
  }
  get date() {
    return this.iwinForm.controls.date
  }
  get category() {
    return this.iwinForm.controls.category
  }

  fetchRecords() {
    this.iwinService.getData().subscribe(res => {
      this.dataArray = res;
    });
  }

  public showSuccessMessage() {
    // set showloader to true to show loading div on view
    this.showloader = true;
    this.timer = Observable.timer(3000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.showloader = false;
    });
  }
}
