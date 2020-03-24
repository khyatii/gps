import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalrowComponent } from './goalrow.component';

describe('GoalrowComponent', () => {
  let component: GoalrowComponent;
  let fixture: ComponentFixture<GoalrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
