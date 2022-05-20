import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldButtonComponent } from './add-field-button.component';

describe('AddFieldButtonComponent', () => {
  let component: AddFieldButtonComponent;
  let fixture: ComponentFixture<AddFieldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFieldButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
