import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleIndicatorComponent } from './simple-indicator.component';

describe('SimpleIndicatorComponent', () => {
  let component: SimpleIndicatorComponent;
  let fixture: ComponentFixture<SimpleIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
