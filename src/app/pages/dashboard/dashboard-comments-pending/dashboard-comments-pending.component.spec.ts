import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommentsPendingComponent } from './dashboard-comments-pending.component';

describe('DashboardCommentsPendingComponent', () => {
  let component: DashboardCommentsPendingComponent;
  let fixture: ComponentFixture<DashboardCommentsPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCommentsPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCommentsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
