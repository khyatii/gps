import { Router } from '@angular/router';
import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-view-fiscal-year',
  templateUrl: './view-fiscal-year.component.html',
  styleUrls: ['./view-fiscal-year.component.css']
})
export class ViewFiscalYearComponent implements OnInit {

  p: number = 1;
  fiscalArray = [];
  successMsg: string;
  isSuccess: boolean = true;
  errorMsg: string;
  isError: boolean = true;
  backgroundColor = {};

  constructor(private hrmService: HrmService, private route: Router, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.hrmService.viewFiscalYear().subscribe(res => {
      this.fiscalArray = res.data;
    });
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
  }

  delete(objData, index) {
    var id = objData.id;
    let value = { id };
    if (confirm(`Are you sure to delete session ` + objData.session_year + ` ?`)) {
      this.hrmService.deleteFiscalYear(value).subscribe(dataany => {
        this.fiscalArray.splice(index, 1);
      }, err => {
        this.errorMsg = "Some Error Occured";
        this.showError();
      })
    }
  }

  edit(objData) {
    let id = objData.id;
    this.route.navigate(['/pages/hrm/modify-fiscal', { id }]);
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
