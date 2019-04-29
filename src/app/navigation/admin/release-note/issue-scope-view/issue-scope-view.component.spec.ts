import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueScopeViewComponent } from './issue-scope-view.component';

describe('IssueScopeViewComponent', () => {
  let component: IssueScopeViewComponent;
  let fixture: ComponentFixture<IssueScopeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueScopeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueScopeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
