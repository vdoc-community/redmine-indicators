import { TestBed } from '@angular/core/testing';

import { ReleaseNoteIssueService } from './release-note-issue.service';

describe('ReleaseNoteIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReleaseNoteIssueService = TestBed.get(ReleaseNoteIssueService);
    expect(service).toBeTruthy();
  });
});
