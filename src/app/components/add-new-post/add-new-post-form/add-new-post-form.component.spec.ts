import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPostFormComponent } from './add-new-post-form.component';

describe('AddNewPostFormComponent', () => {
  let component: AddNewPostFormComponent;
  let fixture: ComponentFixture<AddNewPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPostFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
