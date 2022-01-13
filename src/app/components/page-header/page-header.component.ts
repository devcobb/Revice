import { Component, HostListener, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/global/check-device.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  offcanvasOpen = false;
  mobile = false;
  constructor(private checkDeviceService: CheckDeviceService) { }

  ngOnInit(): void {
    this.mobile = this.checkDeviceService.checkDevice();
  }

  mobileMenuToggle(evt: Event) {
    let target = evt.target as HTMLButtonElement;

    target.classList.toggle('opened');
    this.offcanvasOpen = !this.offcanvasOpen;
  }

  @HostListener('window:scroll', ['$event'])

  changeHeaderBg() {
    let element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > 0) {
      element.classList.add('header-bg');
    } else {
      element.classList.remove('header-bg');
    }
  }
}
