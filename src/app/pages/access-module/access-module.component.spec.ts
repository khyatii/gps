import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessModuleComponent } from './access-module.component';

describe('AccessModuleComponent', () => {
  let component: AccessModuleComponent;
  let fixture: ComponentFixture<AccessModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
