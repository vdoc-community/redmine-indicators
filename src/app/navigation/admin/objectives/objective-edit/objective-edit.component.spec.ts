import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveEditComponent } from './objective-edit.component';

describe('ObjectiveEditComponent', () => {
  let component: ObjectiveEditComponent;
  let fixture: ComponentFixture<ObjectiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
