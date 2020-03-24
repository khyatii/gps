import { FormGroup, FormBuilder } from '@angular/forms';
import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  txtDate: any;
  currentTime: any;
  currentPunchIn: any = '-';
  currentPunchOut: any = '-';
  isPunchOut: boolean = true;
  isPunchInTime: boolean = true;
  isPunchOutTime: boolean = true;
  isPunchIn: boolean = true;
  value: any;
  updatedTime: any;
  attendanceForm: FormGroup;
  backgroundColor: {};

  constructor(private hrmService: HrmService, private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {

    this.attendanceForm = this.fb.group({
      "remarks": ['']
    })
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
    let date = new Date();
    this.txtDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
    let data = { date: this.txtDate }

    this.hrmService.getAttendance(data).subscribe(res => {
      if (res.data.length === 0) {
      }
      else {
        this.currentPunchIn = res.data[0].punch_in;
        this.updatedTime = res.data[0].punch_out;
        if (this.updatedTime == "" || this.updatedTime == undefined) {
          this.isPunchInTime = false;
          this.isPunchOut = false;
          this.isPunchIn = false;
        }
        else {
          if (res.data[0].date == this.txtDate) {
            this.isPunchInTime = true;
            this.isPunchOut = true;
            this.isPunchIn = true;
          }
        }
      }
    });
  }

  punchIn() {
    let date = new Date();
    let datee = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
    let txtTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
    this.currentPunchIn = datee + " " + txtTime;
    this.value = { punchInTime: this.currentPunchIn, date: datee }
    this.isPunchInTime = false;
    this.isPunchOut = false;
    this.isPunchIn = false;
    this.hrmService.postPunchInTime(this.value).subscribe(res => { })
  }
  punchOut(formValue) {
    let date = new Date();
    let datee = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
    let txtTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
    this.currentPunchOut = datee + " " + txtTime;

    let dt1 = new Date(this.currentPunchIn);
    let dt2 = new Date(this.currentPunchOut);
    let difference_ms = Math.abs((dt1.getTime()) - (dt2.getTime())) / 1000;
    let h = Math.floor(difference_ms / 3600);
    let m = Math.floor(difference_ms % 3600 / 60);
    let s = Math.floor(difference_ms % 3600 % 60);
    let hours = (h < 10) ? "0" + h : h;
    let minutes = (m < 10) ? "0" + m : m;
    let seconds = (s < 10) ? "0" + s : s;
    let duration = hours + ' : ' + minutes + ' : ' + seconds;

    formValue.punchOutTime = this.currentPunchOut;
    formValue.date = datee;
    formValue.duration = duration;
    this.isPunchOut = true;
    this.isPunchIn = true;
    this.isPunchOutTime = false;
    this.isPunchInTime = true;
    this.hrmService.postPunchOutTime(formValue).subscribe(res => { })
  }

  get remarks() {
    return this.attendanceForm.get('remarks')
  }

}
