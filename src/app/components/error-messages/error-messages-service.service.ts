import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  constructor() { }
  message = new Subject<string>();
  ratingAdded = new Subject<boolean>();

  validate(validation: boolean, msg: string) {
    if (validation) {
      this.message.next(msg)
    }
  }
}
