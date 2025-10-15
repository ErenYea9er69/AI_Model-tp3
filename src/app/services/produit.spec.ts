import { TestBed } from '@angular/core/testing';

import { AIModel } from '../model/ai.model';

describe('aimodel', () => {
  let service: AIModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AIModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
