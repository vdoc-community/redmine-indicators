import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationsViewComponent } from './iterations-view.component';

describe('IterationsViewComponent', () => {
  let component: IterationsViewComponent;
  let fixture: ComponentFixture<IterationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
