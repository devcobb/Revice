import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorMessagesService } from './error-messages-service.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit, OnDestroy {
  message = "";

  constructor(private erorsMessageService: ErrorMessagesService) {
    this.erorsMessageService.message.subscribe(value => {
      console.log(value)
      this.message = value;
    })
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.erorsMessageService.message.unsubscribe();
  }
}
