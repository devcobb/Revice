import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlideShowService {
  triggerSub = new Subject<boolean>();
  imagesSub = new Subject<string[]>();
  scrollSub = new Subject<boolean>();
  trigger = false;
  scroll = true;

  updateTrigger(images: string[]) {
    this.trigger = !this.trigger;
    this.triggerSub.next(this.trigger);
    this.imagesSub.next(images);
    this.scrollSub.next(this.trigger);
  }

  constructor() {}
}
