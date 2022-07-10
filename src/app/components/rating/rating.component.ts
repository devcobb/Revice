import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CheckDeviceService } from 'src/app/global/check-device.service';
import { Star } from 'src/app/global/global-interfaces';
import { ErrorMessagesService } from '../error-messages/error-messages-service.service';
import { RatingService } from './rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
@HostListener('window:resize', ['$event'])
export class RatingComponent implements OnInit {
  @Input()
  stars: Star[] = [];
  @Input() editable = false;
  @Output() touched = new Subject<boolean>();
  @ViewChildren('starWrap') starWrap!: QueryList<HTMLDivElement>;
  @Input() viewBoxDataDesktop = '-7.75 -4.75 35 35';
  @Input() viewBoxDataMobile = '0 0 25 25';
  viewBoxData = this.viewBoxDataDesktop;

  constructor(
    private errorMessageService: ErrorMessagesService,
    private ratingService: RatingService,
    private checkDeviceService: CheckDeviceService,
    private ref: ChangeDetectorRef
  ) {
    for (let i = 0; i < 10; i++) {
      this.stars.push({ id: i, filled: false });
    }
  }

  ngOnInit(): void {
    this.svgViewBox();
  }

  chooseRating(star: Event) {
    if (this.editable) {
      let starEl = star.currentTarget as HTMLDivElement;
      const parent = starEl.parentNode! as HTMLDivElement;
      const filledStarsId = Number(starEl.dataset.id) + 1;

      this.clearRatings();

      for (let i = Number(starEl.dataset.id); i > -1; i--) {
        this.stars[i].filled = true;
        this.ref.detectChanges();
      }

      console.log(this.stars);
      let starClasses = starEl.getAttribute('class');
      starEl.setAttribute('class', `${starClasses} starAnimate`);
      setTimeout(() => {
        starEl.setAttribute('class', `${starClasses}`);
      }, 300);

      parent.setAttribute('data-stars', String(filledStarsId));
      this.errorMessageService.ratingAdded.next(true);
      this.ratingService.changedRatingValue.next(this.stars);
    }
  }

  clearRatings() {
    const stars = document.querySelector('.stars') as HTMLDivElement;
    stars.dataset.stars = '1';

    this.stars.forEach((star) => {
      star.filled = false;
    });
  }

  onResize(event: Event) {
    this.svgViewBox();
  }

  svgViewBox() {
    !this.checkDeviceService.checkDevice()
      ? (this.viewBoxData = this.viewBoxDataDesktop)
      : (this.viewBoxData = this.viewBoxDataMobile);
  }
}
