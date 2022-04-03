import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseYearComponent } from './choose-year.component';

describe('ChooseYearComponent', () => {
  let component: ChooseYearComponent;
  let fixture: ComponentFixture<ChooseYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
