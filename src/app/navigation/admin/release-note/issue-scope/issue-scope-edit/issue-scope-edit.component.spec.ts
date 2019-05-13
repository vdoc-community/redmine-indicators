import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueScopeEditComponent } from './issue-scope-edit.component';

describe('IssueScopeEditComponent', () => {
  let component: IssueScopeEditComponent;
  let fixture: ComponentFixture<IssueScopeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueScopeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueScopeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
