import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillDialogComponent } from './view-bill-dialog.component';

describe('ViewBillDialogComponent', () => {
  let component: ViewBillDialogComponent;
  let fixture: ComponentFixture<ViewBillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
