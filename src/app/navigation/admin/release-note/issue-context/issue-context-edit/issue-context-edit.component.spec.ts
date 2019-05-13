import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueContextEditComponent } from './issue-context-edit.component';

describe('IssueContextEditComponent', () => {
  let component: IssueContextEditComponent;
  let fixture: ComponentFixture<IssueContextEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueContextEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueContextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
