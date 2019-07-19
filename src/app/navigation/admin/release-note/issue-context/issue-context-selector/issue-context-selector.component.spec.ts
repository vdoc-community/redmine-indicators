import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueContextSelectorComponent } from './issue-context-selector.component';

describe('IssueContextSelectorComponent', () => {
  let component: IssueContextSelectorComponent;
  let fixture: ComponentFixture<IssueContextSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueContextSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueContextSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
