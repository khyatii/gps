import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedCandidRefComponent } from './proceed-candid-ref.component';

describe('ProceedCandidRefComponent', () => {
  let component: ProceedCandidRefComponent;
  let fixture: ComponentFixture<ProceedCandidRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedCandidRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedCandidRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
