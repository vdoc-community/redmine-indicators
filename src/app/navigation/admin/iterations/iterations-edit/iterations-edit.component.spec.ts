import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationsEditComponent } from './iterations-edit.component';

describe('IterationsEditComponent', () => {
  let component: IterationsEditComponent;
  let fixture: ComponentFixture<IterationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
