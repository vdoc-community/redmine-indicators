import { TestBed } from '@angular/core/testing';

import { BurndownService } from './burndown.service';

describe('BurndownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BurndownService = TestBed.get(BurndownService);
    expect(service).toBeTruthy();
  });
});
