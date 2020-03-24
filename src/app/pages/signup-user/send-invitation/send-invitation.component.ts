import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import { RolesService } from '../../../services/roles.service';
import { PageService } from '../../../services/pages.service';
import { UserService } from '../../../services/user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.css']
})
export class SendInvitationComponent implements OnInit {

  constructor(private fb : FormBuilder, private pageService : PageService, private userservice : UserService,
    private ngRedux:NgRedux<IAppState>) { }
  invitationForm : any;
  rolesArray : any;
  emailError : boolean = false;
  backgroundColor : {};
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
      txtRole : ['',Validators.required],
      txtEmail : ['',Validators.email]
    })

    this.userservice.getRoles().subscribe(res => {
      this.rolesArray = res;
    })
  }

  get txtRole(){
    return this.invitationForm.controls.txtRole;
  }
  get txtEmail(){
    return this.invitationForm.controls.txtEmail;
  }

  handleChange(){
    this.emailError = false;
  }

  submit(values){
    //console.log(values)
    this.userservice.userInvitation(values).subscribe(res =>{
      //console.log(res)
      this.pageService.getSuccessMessage(false);
      this.invitationForm.reset();
    },
    err=>{
      this.emailError = true;
      console.log(err);
    })
  }
}
