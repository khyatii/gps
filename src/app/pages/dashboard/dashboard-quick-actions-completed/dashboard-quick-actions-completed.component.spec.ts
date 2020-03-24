import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuickActionsCompletedComponent } from './dashboard-quick-actions-completed.component';

describe('DashboardQuickActionsCompletedComponent', () => {
  let component: DashboardQuickActionsCompletedComponent;
  let fixture: ComponentFixture<DashboardQuickActionsCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuickActionsCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuickActionsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
