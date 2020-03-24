import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateReferenceComponent } from './candidate-reference.component';

describe('CandidateReferenceComponent', () => {
  let component: CandidateReferenceComponent;
  let fixture: ComponentFixture<CandidateReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
