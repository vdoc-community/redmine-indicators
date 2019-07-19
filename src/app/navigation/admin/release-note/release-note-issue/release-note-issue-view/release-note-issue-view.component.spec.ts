import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteIssueViewComponent } from './release-note-issue-view.component';

describe('ReleaseNoteIssueViewComponent', () => {
  let component: ReleaseNoteIssueViewComponent;
  let fixture: ComponentFixture<ReleaseNoteIssueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteIssueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteIssueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
