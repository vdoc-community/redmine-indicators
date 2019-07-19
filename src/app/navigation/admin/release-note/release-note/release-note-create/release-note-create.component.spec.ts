import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteCreateComponent } from './release-note-create.component';

describe('ReleaseNoteCreateComponent', () => {
  let component: ReleaseNoteCreateComponent;
  let fixture: ComponentFixture<ReleaseNoteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
