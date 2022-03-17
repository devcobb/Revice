import { Component, OnInit } from '@angular/core';
import {
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router
} from '@angular/router';
import { ContentHeightService } from './global/content-height.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  needLoading = true;
  shortPage = false

  constructor(private contentHeightService: ContentHeightService, private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? this.contentHeightService.checkForPageHeight(event.url.replace('/', '')) : null;
      this.shortPage = this.contentHeightService.shortPage;
      this.contentHeightService.shortPageSub.subscribe(value => {
        this.shortPage = value;
      })
    })
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
