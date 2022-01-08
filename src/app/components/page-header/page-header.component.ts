import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/global/check-device.service';
import { HeaderTransparencyService } from 'src/app/global/header-transparency.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  transparent = false;
  offcanvasOpen = false;
  mobile = false;
  constructor( private checkDeviceService: CheckDeviceService, private headerTransparencyService: HeaderTransparencyService) { }

  ngOnInit(): void {
    this.mobile = this.checkDeviceService.checkDevice();
    this.transparent = this.headerTransparencyService.checkForTransparency();
  }

  mobileMenuToggle(evt: Event){
    let target = evt.target as HTMLButtonElement;

    target.classList.toggle('opened');
    this.offcanvasOpen = !this.offcanvasOpen;
  }
}
