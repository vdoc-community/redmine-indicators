import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueScopeSelectorComponent } from './issue-scope-selector.component';

describe('IssueScopeSelectorComponent', () => {
  let component: IssueScopeSelectorComponent;
  let fixture: ComponentFixture<IssueScopeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueScopeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueScopeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
