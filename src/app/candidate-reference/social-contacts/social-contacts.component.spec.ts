import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialContactsComponent } from './social-contacts.component';

describe('SocialContactsComponent', () => {
  let component: SocialContactsComponent;
  let fixture: ComponentFixture<SocialContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
