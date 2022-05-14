import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldImageComponent } from './field-image.component';

describe('FieldImageComponent', () => {
  let component: FieldImageComponent;
  let fixture: ComponentFixture<FieldImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
