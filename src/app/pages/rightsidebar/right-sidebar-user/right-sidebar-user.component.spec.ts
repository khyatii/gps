import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarUserComponent } from './right-sidebar-user.component';

describe('RightSidebarUserComponent', () => {
  let component: RightSidebarUserComponent;
  let fixture: ComponentFixture<RightSidebarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSidebarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidebarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
