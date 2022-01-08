import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderTransparencyService {
  pagesWithTransparentHeader: string[] = [
    'home'
  ];
  constructor() { }

  checkForTransparency(){
    let transparency = false;
    this.pagesWithTransparentHeader.forEach( pathname => {
      if(window.location.pathname.includes(pathname)){
        transparency = true;
      }
    });

    return transparency;
  }
}
