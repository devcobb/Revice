import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGalleryComponent } from './field-gallery.component';

describe('FieldGalleryComponent', () => {
  let component: FieldGalleryComponent;
  let fixture: ComponentFixture<FieldGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
