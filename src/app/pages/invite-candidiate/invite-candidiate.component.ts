import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import { PageService } from '../../services/pages.service';
import { UserService } from '../../services/user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-invite-candidiate',
  templateUrl: './invite-candidiate.component.html',
  styleUrls: ['./invite-candidiate.component.css']
})
export class InviteCandidiateComponent implements OnInit {

  constructor(private fb : FormBuilder, private pageService : PageService, private userservice : UserService,
    private ngRedux:NgRedux<IAppState>, private route:ActivatedRoute, private router:Router) { }
  invitationForm : any;
  emailError : boolean = false;
  backgroundColor : {};
  jobId;

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

    this.invitationForm = this.fb.group({
      txtEmail : ['',Validators.email]
    })

    this.route.params.subscribe(params=>{
      this.jobId = params.id;
    })

  }

  get txtEmail(){
    return this.invitationForm.controls.txtEmail;
  }
  
  handleChange(){
    this.emailError = false;
  }

  submit(values){
    console.log(values)
    values['jobId'] = this.jobId
    this.userservice.candidateInvitation(values).subscribe(res =>{
      console.log(res)
      if(res.msg == 'sent'){
        this.pageService.getSuccessMessage(false);
        this.invitationForm.reset();
      }
      else this.pageService.getErrorMessage(false);
    },
    err=>{
      let errmsg = JSON.parse(err._body);
      if(errmsg.msg == 'user already exist'){
        this.emailError = true;
      }
      else this.pageService.getErrorMessage(false);
    })
  }
}
