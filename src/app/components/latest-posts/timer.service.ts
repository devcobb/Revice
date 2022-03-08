import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timer = 0;
  timerInterval = 0;
  constructor() { }

  setTimer() {
    this.timerInterval = window.setInterval(() => {
      this.timer++;
      console.log(this.timer)
      if (3600) {
        return this.clearTimer();
      }
    }, 1000)
  }

  clearTimer() {
    window.clearInterval(this.timerInterval);
    this.timer = 0;
    this.setTimer();
  }
}
