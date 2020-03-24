import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../../../store/reducer';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css']
})
export class PersonaldetailsComponent implements OnInit {
  userData: any
  value: boolean = false
  updateForm: FormGroup
  disable: boolean = true
  txtDate;
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  bloodGroupArray = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  imagePath: string;
  fileName: string;
  public selectedFiles;
  filess: File;
  profileId : any;
  isUser : boolean = false;
  backgroundColor : {};

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router,
    private router: ActivatedRoute,private ngRedux:NgRedux<IAppState>) { }

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

    this.profileId = this.router.snapshot.params['id'];    
    if(this.profileId != undefined){
      this.getSelectedUserProfileDetails(this.profileId);
      this.isUser = true;
    }
    else{
      this.getCurrentUserProfileDetails();
    }    
  }

  getSelectedUserProfileDetails(id){    
    this.userService.getSelectedUserProfileImage(id).subscribe(res => {
      this.imagePath = res[0].image;
    });

    this.userService.getSelectedUserContactDetails(id).subscribe(res => {
      this.userData = res[0];  
      this.value = true;    
      this.updateForm = this.fb.group({
        "firstName": [this.userData.first_name],
        "lastName": [this.userData.last_name],
        "gender": [this.userData.gender],
        "BloodGroup": [this.userData.blood_group],
        "dob": [this.userData.dob]
      })
      let stringToSplit = res[0].dob;
      let x = stringToSplit.split("-");
      this.updateForm.patchValue({
        dob: {
          date: {
            year: x[0],
            month: x[1],
            day: x[2]
          }
        }
      });
    });
  }

  getCurrentUserProfileDetails(){
    this.userService.getProfileImage().subscribe(res => {
      this.imagePath = res[0].image;
    });
    this.userService.getContactDetails().subscribe(res => {
      this.userData = res[0];      
      this.value = true;
      this.updateForm = this.fb.group({
        "firstName": [this.userData.first_name],
        "lastName": [this.userData.last_name],
        "gender": [this.userData.gender],
        "BloodGroup": [this.userData.blood_group],
        "dob": [this.userData.dob]
      })
      let stringToSplit = res[0].dob;
      let x = stringToSplit.split("-");
      this.updateForm.patchValue({
        dob: {
          date: {
            year: x[0],
            month: x[1],
            day: x[2]
          }
        }
      });
    });
  }

  filesSelect(selectedFile: Ng4FilesSelected): void {
    this.filess = <File>selectedFile.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      var imageSrccc = e.target.result;
      this.imagePath = imageSrccc;
    };
    reader.readAsDataURL(<File>selectedFile.files[0]); // read file as data url

    if (selectedFile.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFile.status;
      return;
    }
    this.selectedFiles = Array.from(selectedFile.files).map(file => file.name);
  }

  Update(value) {
    value.dateofbirth = this.txtDate;
    value.token = localStorage.getItem('token');
    this.userService.postUserData(value).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
      } else {
        this.showError();
      }
    });
    let fileCount: number;
    if (this.selectedFiles == undefined) {
      fileCount = 0;
    } else {
      fileCount = this.selectedFiles.length;
    }
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('image', this.filess, this.filess.name);
      //call the angular http method
      this.userService.postImage(formData).subscribe(res => { })
    }
  }

  UpdateSelectedUser(value){
    value.dateofbirth = this.txtDate;
    value.token = localStorage.getItem('token');
    value.selUserId = this.profileId;
    this.userService.postUserData(value).subscribe(res => {
      if (res.message == 'updated') {
        this.showSuccess();
      } else {
        this.showError();
      }
    });
    let fileCount: number;
    if (this.selectedFiles == undefined) {
      fileCount = 0;
    } else {
      fileCount = this.selectedFiles.length;
    }
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('image', this.filess, this.filess.name);
      //call the angular http method
      this.userService.postImage(formData).subscribe(res => { })
    }
  }

  onDateChanged(event: IMyDateModel) {
    this.txtDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
  }

  get firstName() {
    return this.updateForm.controls.firstName
  }
  get lastName() {
    return this.updateForm.controls.lastName
  }
  get gender() {
    return this.updateForm.controls.gender
  }
  get BloodGroup() {
    return this.updateForm.controls.BloodGroup
  }
  get dob() {
    return this.updateForm.controls.dob
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
