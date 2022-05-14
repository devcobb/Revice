import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-banner',
  templateUrl: './field-banner.component.html',
  styleUrls: ['./field-banner.component.scss']
})
export class FieldBannerComponent implements OnInit {
  @Input() title = "";
  @Input() value = "";
  @Input() image = "";
  @Input() isReverse = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.isReverse)
  }

}
