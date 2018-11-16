import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenIssueByCategoryComponent } from './open-issue-by-category.component';

describe('OpenIssueByCategoryComponent', () => {
  let component: OpenIssueByCategoryComponent;
  let fixture: ComponentFixture<OpenIssueByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenIssueByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenIssueByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
