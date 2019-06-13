import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteIssueSelectorComponent } from './release-note-issue-selector.component';

describe('ReleaseNoteIssueSelectorComponent', () => {
  let component: ReleaseNoteIssueSelectorComponent;
  let fixture: ComponentFixture<ReleaseNoteIssueSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteIssueSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteIssueSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
