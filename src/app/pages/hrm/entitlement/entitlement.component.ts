import { HrmService } from './../../../services/hrm.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/reducer';

@Component({
  selector: 'app-entitlement',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.css']
})
export class EntitlementComponent implements OnInit {

  p: number = 1;
  EntitlementArray = [];
  backgroundColor: {};

  constructor(private hrmService:HrmService,private route:Router,private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.hrmService.getEntitlements().subscribe(res => {
      this.EntitlementArray = res.data;
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
      })
  }

  delete(objData, index) {
    var id = objData.id;
		let value = { id };
		if (confirm(`Are you sure to delete Entitlement for ` + objData.user_name + ` ?`)) {
			this.hrmService.deleteEntitlements(value).subscribe(dataany => {
				this.EntitlementArray.splice(index, 1);
			})
		}
  }

  edit(objData){
    let id = objData.id;
    this.route.navigate(['/pages/hrm/modifyEntitlement', { id }]);
  }

}
