import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
})
export class SlideShowComponent {
  @Input() images = [];
  currentImageID = 0;
  constructor() {}

  previousSlide() {
    if (this.currentImageID - 1 >= 0) {
      this.currentImageID--;
    }
  }

  nextSlide() {
    if (this.currentImageID + 1 <= this.images.length - 1) {
      this.currentImageID++;
    }
  }
}
