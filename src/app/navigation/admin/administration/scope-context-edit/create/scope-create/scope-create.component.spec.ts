import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeCreateComponent } from './scope-create.component';

describe('ScopeContextCreateComponent', () => {
  let component: ScopeCreateComponent;
  let fixture: ComponentFixture<ScopeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
