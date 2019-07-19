import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteIssueEditComponent } from './release-note-issue-edit.component';

describe('ReleaseNoteIssueEditComponent', () => {
  let component: ReleaseNoteIssueEditComponent;
  let fixture: ComponentFixture<ReleaseNoteIssueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteIssueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteIssueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
