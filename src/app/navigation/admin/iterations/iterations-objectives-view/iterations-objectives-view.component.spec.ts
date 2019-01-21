import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationsObjectivesViewComponent } from './iterations-objectives-view.component';

describe('IterationsObjectivesViewComponent', () => {
  let component: IterationsObjectivesViewComponent;
  let fixture: ComponentFixture<IterationsObjectivesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationsObjectivesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationsObjectivesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
