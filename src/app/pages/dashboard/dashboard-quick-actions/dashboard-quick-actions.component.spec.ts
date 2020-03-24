import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuickActionsComponent } from './dashboard-quick-actions.component';

describe('DashboardQuickActionsComponent', () => {
  let component: DashboardQuickActionsComponent;
  let fixture: ComponentFixture<DashboardQuickActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuickActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
