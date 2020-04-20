import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryTopbarComponent } from './secondary-topbar.component';

describe('SecondaryTopbarComponent', () => {
  let component: SecondaryTopbarComponent;
  let fixture: ComponentFixture<SecondaryTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
