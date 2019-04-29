import { TestBed } from '@angular/core/testing';

import { IssueScopeService } from './issue-scope.service';

describe('IssueScopeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueScopeService = TestBed.get(IssueScopeService);
    expect(service).toBeTruthy();
  });
});
