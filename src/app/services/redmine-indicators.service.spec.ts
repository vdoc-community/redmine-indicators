import { TestBed } from '@angular/core/testing';

import { RedmineIndicatorsService } from './redmine-indicators.service';

describe('RedmineIndicatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedmineIndicatorsService = TestBed.get(RedmineIndicatorsService);
    expect(service).toBeTruthy();
  });
});
