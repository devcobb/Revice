import { Component, OnInit } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  needLoading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {}

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
