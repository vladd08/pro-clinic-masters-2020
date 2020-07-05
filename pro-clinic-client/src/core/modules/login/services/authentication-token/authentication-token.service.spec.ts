import { TestBed } from '@angular/core/testing';

import { AuthenticationTokenService } from './authentication-token.service';

describe('AuthenticationTokenService', () => {
  let service: AuthenticationTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
