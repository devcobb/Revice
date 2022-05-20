import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTextFieldComponent } from './add-new-text-field.component';

describe('AddNewTextFieldComponent', () => {
  let component: AddNewTextFieldComponent;
  let fixture: ComponentFixture<AddNewTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
