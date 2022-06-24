import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-banner',
  templateUrl: './field-banner.component.html',
  styleUrls: ['./field-banner.component.scss'],
})
export class FieldBannerComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() image = '';
  @Input() isReverse = false;
  constructor() {}
}
