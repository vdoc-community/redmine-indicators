import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteEditComponent } from './release-note-edit.component';

describe('ReleaseNoteEditComponent', () => {
  let component: ReleaseNoteEditComponent;
  let fixture: ComponentFixture<ReleaseNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
