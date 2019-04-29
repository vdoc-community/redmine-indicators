import { TestBed } from '@angular/core/testing';

import { IssueContextService } from './issue-context.service';

describe('IssueContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueContextService = TestBed.get(IssueContextService);
    expect(service).toBeTruthy();
  });
});
