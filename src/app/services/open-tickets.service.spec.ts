import { TestBed } from '@angular/core/testing';

import { OpenTicketsService } from './open-tickets.service';

describe('OpenTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenTicketsService = TestBed.get(OpenTicketsService);
    expect(service).toBeTruthy();
  });
});
