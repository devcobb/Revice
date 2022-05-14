import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldBannerComponent } from './field-banner.component';

describe('FieldBannerComponent', () => {
  let component: FieldBannerComponent;
  let fixture: ComponentFixture<FieldBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
