import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsSummaryDialogComponent } from './shifts-summary-dialog.component';

describe('ShiftsSummaryDialogComponent', () => {
  let component: ShiftsSummaryDialogComponent;
  let fixture: ComponentFixture<ShiftsSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
