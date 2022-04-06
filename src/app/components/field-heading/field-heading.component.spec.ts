import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHeadingComponent } from './field-heading.component';

describe('FieldHeadingComponent', () => {
  let component: FieldHeadingComponent;
  let fixture: ComponentFixture<FieldHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
