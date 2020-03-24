import { Component, OnInit, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { NgIf } from '@angular/common';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/reducer';
import { PageService } from '../../services/pages.service';
import { AccessManagementService } from '../../services/access-management.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  backgroundColor: {}
  dataArr: any;
  constructor(private ngRedux: NgRedux<IAppState>, private pageService: PageService, private accessService: AccessManagementService) { }

  ngOnInit() {
    this.bindpages();
    this.accessService.accessStatus.subscribe(status => {
      this.bindpages();
    })

    this.ngRedux.select(state => state) // select the entire state
      .subscribe(state => {
        {
          if(state.counter != null){
            this.backgroundColor = {
              "background-color" : state.counter
            }
           }
           else{
            this.backgroundColor = {
              "background-color" : '#1c4561'
            }
          }
        }
      })
  }

  @ViewChild('patientDDL') patientDDL: ElementRef;
  @ViewChild('li') ul;
  active = false;
  isDone: boolean = true;
  isIndex: boolean = true;
  @Output('isOut') isOut = new EventEmitter();

  HideSidebar() {
    this.active = !this.active;
    this.isOut.emit(this.isDone);
    this.isDone = !this.isDone;
  }
  public isCollapsed: boolean = true;
  Collapse(e: HTMLLIElement) {
    if (this.patientDDL.nativeElement.classList.contains('side1')) {
      if (e.classList.contains('height')) {
        var looptime = document.getElementsByClassName('SidebarUl').length;
        for (let i = 0; i < looptime; i++) {
          document.getElementsByClassName('SidebarUl')[i].classList.add('height')
          document.getElementsByClassName('carets')[i].classList.add('fa-caret-left')
          document.getElementsByClassName('carets')[i].classList.remove('fa-caret-down')
        }
      }
      e.classList.toggle('height');
      var fa = e.parentElement.querySelector('span i');
      fa.classList.toggle('fa-caret-down');
      fa.classList.toggle('fa-caret-left');
    }
  }
  MouseEnter(e: HTMLLIElement, index) {
    if (this.patientDDL.nativeElement.classList.contains('side')) {
      e.classList.add('display');
      this.isDone = false;
      index.classList.add('z1');
    }
  }
  MouseLeave(e: HTMLLIElement, index) {
    if (this.patientDDL.nativeElement.classList.contains('side')) {
      e.classList.remove('display');
      this.isDone = true;
      index.classList.remove('z1');
    }
  }

  bindpages() {
    let roleId = localStorage.getItem('roleid');
    let post = { roleId: roleId }
    this.pageService.getUserPages(post).subscribe(res => {
      //console.log('data before filteration',res);
      let data = res;
      let newArr = [];
      let smallArr = [];
      for (let i = 0; i < data.length; i++) {
        data[i].url = [data[i].url];
        let currData = data[i];
        let nextData = data[i];
        if (data[i + 1] != undefined) {
          nextData = data[i + 1];
        }

        if (i == 0) {
          smallArr.push(data[i]);
        }
        if (nextData['module_name'] == currData['module_name'] && i > 0) {
          smallArr.push(data[i]);
        }
        else if (nextData['module_name'] != currData['module_name']) {
          if (i != 0) {
            smallArr.push(data[i]);
          }

          let obj = {
            module_name: currData['module_name'],
            module_id: currData['module_id'],
            module_class: currData['module_class'],
            dataArr: smallArr
          }
          newArr.push(obj);
          smallArr = [];
        }
        if (i == data.length - 1) {
          let obj = {
            module_name: currData['module_name'],
            module_id: currData['module_id'],
            module_class: currData['module_class'],
            dataArr: smallArr
          }
          newArr.push(obj);
          smallArr = [];
        }
      }
      this.dataArr = newArr;
      //console.log('data after filteration',newArr);
    })
  }
}
