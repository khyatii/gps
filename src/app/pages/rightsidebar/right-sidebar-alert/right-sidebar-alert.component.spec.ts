import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarAlertComponent } from './right-sidebar-alert.component';

describe('RightSidebarAlertComponent', () => {
  let component: RightSidebarAlertComponent;
  let fixture: ComponentFixture<RightSidebarAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSidebarAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidebarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
