import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaltableComponent } from './goaltable.component';

describe('GoaltableComponent', () => {
  let component: GoaltableComponent;
  let fixture: ComponentFixture<GoaltableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoaltableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
