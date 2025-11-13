import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aimodelGuard } from './aimodel-guard';

describe('aimodelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aimodelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
