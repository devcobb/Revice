import { Component, Input, OnInit } from '@angular/core';
import { Star } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() stars: Star[] = [];
  @Input() editable = false;
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.stars.push({ id: i, filled: false, half: false })
    }
  }

  ngOnInit(): void { }

  chooseRating(star: Star) {
    if (this.editable) {
      this.clearRatings();
      let stars = document.querySelectorAll('.star');

      for (let i = star.id; i > -1; i--) {
        stars[i].className = "star star-filled";
        this.stars[i].filled = true;
      }
    }
  }

  showHalfStar(star: HTMLDivElement) {
    if (this.editable) {
      if (star.dataset.id) {
        !this.stars[parseInt(star.dataset.id)].half ? star.className = "star star-half" : "star star-filled";
        this.stars[parseInt(star.dataset.id)].half = !this.stars[parseInt(star.dataset.id)].half;
      }
    }
  }

  clearRatings() {
    document.querySelectorAll('.star').forEach(star => star.className = "star");
    this.stars.forEach(star => {
      star.filled = false;
      star.half = false;
    })
  }
}
