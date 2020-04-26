import { TestBed } from '@angular/core/testing';

import { InitializeGuard } from './initialize.guard';

describe('InitializeGuard', () => {
  let guard: InitializeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitializeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
