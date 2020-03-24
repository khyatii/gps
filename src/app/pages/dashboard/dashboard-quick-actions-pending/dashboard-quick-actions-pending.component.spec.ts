import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuickActionsPendingComponent } from './dashboard-quick-actions-pending.component';

describe('DashboardQuickActionsPendingComponent', () => {
  let component: DashboardQuickActionsPendingComponent;
  let fixture: ComponentFixture<DashboardQuickActionsPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuickActionsPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuickActionsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
