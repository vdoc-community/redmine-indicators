import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeContextViewComponent } from './scope-context-view.component';

describe('ScopeContextEditComponent', () => {
  let component: ScopeContextViewComponent;
  let fixture: ComponentFixture<ScopeContextViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeContextViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeContextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
