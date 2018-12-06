import { TestBed, async, inject } from '@angular/core/testing';

import { XRedmineApiKeyGuard } from './x-redmine-api-key.guard';

describe('XRedmineApiKeyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XRedmineApiKeyGuard]
    });
  });

  it('should ...', inject([XRedmineApiKeyGuard], (guard: XRedmineApiKeyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
