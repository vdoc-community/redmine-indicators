import { TestBed } from '@angular/core/testing';

import { ReleaseNoteService } from './release-note.service';

describe('ReleaseNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReleaseNoteService = TestBed.get(ReleaseNoteService);
    expect(service).toBeTruthy();
  });
});
