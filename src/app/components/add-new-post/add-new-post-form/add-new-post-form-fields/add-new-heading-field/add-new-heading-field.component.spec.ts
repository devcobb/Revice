import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHeadingFieldComponent } from './add-new-heading-field.component';

describe('AddNewHeadingFieldComponent', () => {
  let component: AddNewHeadingFieldComponent;
  let fixture: ComponentFixture<AddNewHeadingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewHeadingFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewHeadingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
