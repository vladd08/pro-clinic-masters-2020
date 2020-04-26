import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecondStepComponent } from './login-second-step.component';

describe('LoginSecondStepComponent', () => {
  let component: LoginSecondStepComponent;
  let fixture: ComponentFixture<LoginSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSecondStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
