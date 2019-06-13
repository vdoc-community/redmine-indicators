import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNoteSelectorComponent } from './release-note-selector.component';

describe('ReleaseNoteSelectorComponent', () => {
  let component: ReleaseNoteSelectorComponent;
  let fixture: ComponentFixture<ReleaseNoteSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNoteSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNoteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
