import { Component, Input, OnInit } from '@angular/core';
import { Star } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-field-rating',
  templateUrl: './field-rating.component.html',
  styleUrls: ['./field-rating.component.scss']
})
export class FieldRatingComponent implements OnInit {
  @Input() title = "";
  @Input() value = "";
  @Input() image = "";
  @Input() isReverse = false;
  @Input() rating: Star[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.rating)
  }

}
