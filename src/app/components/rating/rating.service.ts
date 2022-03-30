import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Star } from 'src/app/global/global-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  @Output() changedRatingValue = new Subject<Star[]>();
  constructor() { }
}
