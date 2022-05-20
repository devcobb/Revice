import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBannerFieldComponent } from './add-new-banner-field.component';

describe('AddNewBannerFieldComponent', () => {
  let component: AddNewBannerFieldComponent;
  let fixture: ComponentFixture<AddNewBannerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBannerFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBannerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
