import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../store/reducer';
import { Router, ActivatedRoute } from '@angular/router';
const URL = 'http://localhost:4000/users/updateProfile';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

    personalHide: boolean = true;
    jobHide: boolean = true;
    contactHide: boolean = true;
    backgroundColor: {};
    profileId : any;
    isUser : boolean = true;

    constructor(private ngRedux: NgRedux<IAppState>, private router : ActivatedRoute) { }

    ngOnInit() {
        this.profileId = this.router.snapshot.params['id'];  
        if(this.profileId != undefined){
            this.isUser = false;
        }
        this.ngRedux
            .select(state => state) // select the entire state
            .subscribe(state => {
                this.backgroundColor = {
                    "background-color": state.counter
                }
            })
    }

    personal() {
        this.personalHide = true;
        this.jobHide = true;
        this.contactHide = true;
    }
    job() {
        this.personalHide = false;
        this.jobHide = false;
        this.contactHide = true;
    }
    contact() {
        this.personalHide = false;
        this.jobHide = true;
        this.contactHide = false;
    }
}
