import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirstStepComponent } from './login-first-step.component';

describe('LoginFirstStepComponent', () => {
  let component: LoginFirstStepComponent;
  let fixture: ComponentFixture<LoginFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFirstStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
