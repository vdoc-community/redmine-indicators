import { TestBed } from '@angular/core/testing';

import { RedmineClient } from './redmine-client.service';

describe('RedmineAwareClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedmineClient = TestBed.get(RedmineClient);
    expect(service).toBeTruthy();
  });
});
