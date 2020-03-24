import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommentsApprovedComponent } from './dashboard-comments-approved.component';

describe('DashboardCommentsApprovedComponent', () => {
  let component: DashboardCommentsApprovedComponent;
  let fixture: ComponentFixture<DashboardCommentsApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCommentsApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCommentsApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
