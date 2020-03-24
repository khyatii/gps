import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReferenceComponent } from './view-reference.component';

describe('ViewReferenceComponent', () => {
  let component: ViewReferenceComponent;
  let fixture: ComponentFixture<ViewReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
