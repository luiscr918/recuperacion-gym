import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gurdianrutaGuard } from './gurdianruta.guard';

describe('gurdianrutaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gurdianrutaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
