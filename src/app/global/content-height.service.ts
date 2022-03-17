import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentHeightService {
  shortPage = false;
  shortPageSub = new Subject<boolean>();
  shortPages = ['account', 'new', 'login'];

  constructor() { }

  checkForPageHeight(url: string) {
    this.shortPages.find(page => page === url) ? this.shortPage = true : this.shortPage = false
  }

  toggle() {
    this.shortPage = !this.shortPage;
    this.shortPageSub.next(this.shortPage)
  }
}
