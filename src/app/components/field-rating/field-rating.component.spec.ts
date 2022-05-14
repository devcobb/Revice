import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRatingComponent } from './field-rating.component';

describe('FieldRatingComponent', () => {
  let component: FieldRatingComponent;
  let fixture: ComponentFixture<FieldRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
