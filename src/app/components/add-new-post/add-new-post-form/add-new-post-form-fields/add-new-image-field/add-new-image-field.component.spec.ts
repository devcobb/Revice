import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewImageFieldComponent } from './add-new-image-field.component';

describe('AddNewImageFieldComponent', () => {
  let component: AddNewImageFieldComponent;
  let fixture: ComponentFixture<AddNewImageFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewImageFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewImageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
