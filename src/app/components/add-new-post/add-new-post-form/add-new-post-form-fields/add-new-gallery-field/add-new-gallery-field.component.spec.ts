import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGalleryFieldComponent } from './add-new-gallery-field.component';

describe('AddNewGalleryFieldComponent', () => {
  let component: AddNewGalleryFieldComponent;
  let fixture: ComponentFixture<AddNewGalleryFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewGalleryFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGalleryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
