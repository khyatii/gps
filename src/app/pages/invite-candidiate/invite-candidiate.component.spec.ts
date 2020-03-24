import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCandidiateComponent } from './invite-candidiate.component';

describe('InviteCandidiateComponent', () => {
  let component: InviteCandidiateComponent;
  let fixture: ComponentFixture<InviteCandidiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteCandidiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCandidiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
