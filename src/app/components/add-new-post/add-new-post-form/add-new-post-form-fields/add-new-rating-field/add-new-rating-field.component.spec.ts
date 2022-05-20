import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRatingFieldComponent } from './add-new-rating-field.component';

describe('AddNewRatingFieldComponent', () => {
  let component: AddNewRatingFieldComponent;
  let fixture: ComponentFixture<AddNewRatingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRatingFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRatingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
