import { TestBed } from '@angular/core/testing';

import { ObjectivesService } from './objectives.service';

describe('ObjectivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectivesService = TestBed.get(ObjectivesService);
    expect(service).toBeTruthy();
  });
});
