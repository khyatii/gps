import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompletegoalsComponent } from './incompletegoals.component';

describe('IncompletegoalsComponent', () => {
  let component: IncompletegoalsComponent;
  let fixture: ComponentFixture<IncompletegoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompletegoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompletegoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
