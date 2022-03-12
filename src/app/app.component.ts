import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shortPage = false;
  shortPages = ['account', 'new', 'login'];
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => { event instanceof NavigationEnd ? this.checkForPageHeight(event.url.replace('/', '')) : null })
  }

  checkForPageHeight(url: string) {
    this.shortPages.find(page => page === url) ? this.shortPage = true : this.shortPage = false
  }
}
