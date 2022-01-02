import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  offcanvasOpen = false;
  mobile = false;
  constructor() { }

  ngOnInit(): void {
    this.checkDevice();
  }

  mobileMenuToggle(evt: Event){
    let target = evt.target as HTMLButtonElement;

    target.classList.toggle('opened');
    this.offcanvasOpen = !this.offcanvasOpen;
  }

  checkDevice(){
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)){
        this.mobile = true;
      }
  }
  
}
