import { Component, OnInit } from '@angular/core';
import {
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shortPage = false;
  shortPages = ['account', 'new', 'login'];
  needLoading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit() {
    this.router.events.subscribe((event) => { event instanceof NavigationEnd ? this.checkForPageHeight(event.url.replace('/', '')) : null })
  }

  checkForPageHeight(url: string) {
    this.shortPages.find(page => page === url) ? this.shortPage = true : this.shortPage = false
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.needLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.needLoading = false;
    }

    if (event instanceof NavigationCancel) {
      this.needLoading = false;
    }
    if (event instanceof NavigationError) {
      this.needLoading = false;
    }
  }
}
