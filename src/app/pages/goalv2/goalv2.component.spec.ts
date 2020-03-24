import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Goalv2Component } from './goalv2.component';

describe('Goalv2Component', () => {
  let component: Goalv2Component;
  let fixture: ComponentFixture<Goalv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Goalv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Goalv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
