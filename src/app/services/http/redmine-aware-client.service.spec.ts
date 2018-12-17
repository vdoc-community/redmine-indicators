import { TestBed } from '@angular/core/testing';

import { RedmineAwareClientService } from './redmine-aware-client.service';

describe('RedmineAwareClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedmineAwareClientService = TestBed.get(RedmineAwareClientService);
    expect(service).toBeTruthy();
  });
});
