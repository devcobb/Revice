import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastestPostsViewComponent } from './lastest-posts-view.component';

describe('LastestPostsViewComponent', () => {
  let component: LastestPostsViewComponent;
  let fixture: ComponentFixture<LastestPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastestPostsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastestPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
