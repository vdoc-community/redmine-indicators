import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeDisplayComponent } from './scope-display.component';

describe('ScopeDisplayComponent', () => {
  let component: ScopeDisplayComponent;
  let fixture: ComponentFixture<ScopeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
