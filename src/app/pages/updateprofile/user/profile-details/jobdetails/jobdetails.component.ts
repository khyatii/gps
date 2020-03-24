import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './../../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import { TagModel } from 'ngx-chips/core/accessor';
import { Url } from "../../../../../common/serverurl.class";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../../store/reducer';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {

  value: boolean = false
  userData: any;
  updateForm: FormGroup;
  txtDate: any;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  staffId: any;
  isUser: boolean = true;
  profileId: any;
  backgroundColor: {};

  constructor(private userService: UserService, private fb: FormBuilder, private route: Router,
    private router: ActivatedRoute, private http: Http, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    //redux
    this.ngRedux
      .select(state => state) // select the entire state
      .subscribe(state => {
        {
          this.backgroundColor = {
            "background-color": state.counter,
            "color": "white"
          }
        }
      })

    this.profileId = this.router.snapshot.params['id'];
    if (this.profileId != undefined) {
      this.getSelectedUserProfileDetails(this.profileId);
      this.isUser = false;
    }
    else {
      this.getCurrentUserProfileDetails();
    }
  }

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url = `${Url.url}/getSkills?q=${text}`;
    return this.http
      .get(url)
      .pipe(map(res => res.json()));
  };

  getSelectedUserProfileDetails(id) {
    this.userService.getSelectedUserJobDetail(id).subscribe(res => {
      this.userData = res[0];
      this.value = true;
      if (this.userData == undefined) {
        this.updateForm = this.fb.group({
          "staff_id": [],
          "Designation": [],
          "Status": [],
          "Joining": [],
          "Salary": [],
          "Department": [],
          "jobrole": [],
          "Skills": []
        })
      } else {
        this.staffId = 'ST-' + this.userData.user_id;
        if (this.userData.user_type == 'A') {
          this.isUser = false;
        }

        this.updateForm = this.fb.group({
          "staff_id": [this.staffId],
          "Designation": [this.userData.designation],
          "Status": [this.userData.user_status],
          "Joining": [this.userData.joining_date],
          "Salary": [this.userData.salary],
          "Department": [this.userData.department],
          "jobrole": [this.userData.role_name],
          "Skills": []
        })

        let stringToSplit = this.userData.joining_date;
        let x = stringToSplit.split("-");
        if (!this.isUser) {
          this.updateForm.patchValue({
            Joining: {
              date: {
                year: x[0],
                month: x[1],
                day: x[2]
              }
            }
          });
        }
        let skills = this.convertStringToArray(this.userData.skills);
        this.updateForm.controls['Skills'].setValue(skills);
      }
    });
  }

  getCurrentUserProfileDetails() {
    this.userService.getJobDetail().subscribe(res => {
      this.userData = res[0];
      this.value = true;
      if (this.userData == undefined) {
        this.updateForm = this.fb.group({
          "staff_id": [],
          "Designation": [],
          "Status": [],
          "Joining": [],
          "Salary": [],
          "Department": [],
          "jobrole": [],
          "Skills": []
        })
      } else {
        this.staffId = 'ST-' + this.userData.user_id;
        if (this.userData.user_type == 'A') {
          this.isUser = false;
        }

        this.updateForm = this.fb.group({
          "staff_id": [this.staffId],
          "Designation": [this.userData.designation],
          "Status": [this.userData.user_status],
          "Joining": [this.userData.joining_date],
          "Salary": [this.userData.salary],
          "Department": [this.userData.department],
          "jobrole": [this.userData.role_name],
          "Skills": []
        })

        let stringToSplit = this.userData.joining_date;
        let x = stringToSplit.split("-");
        if (!this.isUser) {
          this.updateForm.patchValue({
            Joining: {
              date: {
                year: x[0],
                month: x[1],
                day: x[2]
              }
            }
          });
        }
        let skills = this.convertStringToArray(this.userData.skills);
        this.updateForm.controls['Skills'].setValue(skills);
      }
    });
  }

  Update(value) {
    value.Skills = this.convertSkillArrayToString(value.Skills);
    value.token = localStorage.getItem('token');
    value.joining_date = this.txtDate;
    value.selUserId = this.profileId;
    value.staffId = this.staffId.replace(/\D/g, '');;
    this.userService.postJobDetail(value).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
        setTimeout(() => {
        }, 2000)
      } else {
        this.showError();
      }
    });
  }

  convertStringToArray(value) {
    if (value !== null) {
      value = value.split(',');
      let arr = [];
      value.forEach(v => {
        let obj = {};
        obj['Name'] = v;
        arr.push(obj);
      });
      return arr;
    }
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

  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
  }

  get staff_id() {
    return this.updateForm.controls.staff_id
  }
  get Designation() {
    return this.updateForm.controls.Designation
  }
  get Status() {
    return this.updateForm.controls.Status
  }
  get Joining() {
    return this.updateForm.controls.Joining
  }
  get Salary() {
    return this.updateForm.controls.Salary
  }
  get Department() {
    return this.updateForm.controls.Department
  }
  get jobrole() {
    return this.updateForm.controls.jobrole
  }
  get Skills() {
    return this.updateForm.controls.Skills
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
