import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRatingsComponent } from './candidate-ratings.component';

describe('CandidateRatingsComponent', () => {
  let component: CandidateRatingsComponent;
  let fixture: ComponentFixture<CandidateRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
