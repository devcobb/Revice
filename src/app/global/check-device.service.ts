import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckDeviceService {

  constructor() { }

  checkDevice(){
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
      return true
    }
    return false
  }
}
