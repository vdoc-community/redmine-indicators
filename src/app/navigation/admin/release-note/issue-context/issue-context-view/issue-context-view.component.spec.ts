import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueContextViewComponent } from './issue-context-view.component';

describe('IssueContextViewComponent', () => {
  let component: IssueContextViewComponent;
  let fixture: ComponentFixture<IssueContextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueContextViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueContextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
