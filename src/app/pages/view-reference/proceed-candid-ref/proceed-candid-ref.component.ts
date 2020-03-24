import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateRefService } from './../../../services/candidate-ref.service';
import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-proceed-candid-ref',
  templateUrl: './proceed-candid-ref.component.html',
  styleUrls: ['./proceed-candid-ref.component.css']
})
export class ProceedCandidRefComponent implements OnInit {
  refId ; 
  selectUserForm: FormGroup;
  rolesArray = [];
  usersArray = [];
  txtDate;
  selectedStaff;
  selectedTime;
  skills = [];
  name;
  dob;
  email;
  phone;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private candidateService:CandidateRefService,
   private userservice:UserService, private atp: AmazingTimePickerService, private router: Router) { 
    this.route.params.subscribe(params=>{
      this.refId = params;
    })
  }

  ngOnInit() {
    this.candidateService.getReferenceDetails(this.refId).subscribe(resp=>{
      this.name = resp.info[0].first_name+ '' + resp.info[0].last_name;
      this.dob = resp.info[0].dob;
      this.email = resp.info[0].email;
      this.phone = resp.info[0].phone;
    })

    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
    
    this.selectUserForm = this.fb.group({
      'roles': ['', Validators.required],
      'staffId': ['', Validators.required],
      'date': ['', Validators.required],
      'interview_Time': ['',Validators.required],
      'interview_mode':['',Validators.required],
      'interview_venue': ['',Validators.required],
      'interview_note':[null]
    });

  }
      
  roleSelected(eve){
    let value = { roleId:eve.target.value };
    this.userservice.getUserRoles(value).subscribe(res => {
      this.usersArray = res.data;
    });
  }


  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + ("0" + event.date.month).slice(-2) + "-" + ("0" + event.date.day).slice(-2);
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
        // this.selectedTime = time;
        this.selectUserForm.controls['interview_Time'].setValue(time);
    });
  }
  scheduleInterview(data){
    data.referenceId = this.refId.id;
    data.date = this.txtDate;
    this.candidateService.scheduleInterview(data).subscribe(resp=>{
      this.router.navigate(['pages/view-reference']);
    })
  }

  showRefList(){
    this.router.navigate(['pages/view-reference']);
  }
  
}
