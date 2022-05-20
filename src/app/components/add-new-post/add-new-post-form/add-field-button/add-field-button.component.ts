import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-field-button',
  templateUrl: './add-field-button.component.html',
  styleUrls: ['./add-field-button.component.scss'],
})
export class AddFieldButtonComponent {
  @Input() text = '';
  @Input() key = '';
  @Input() img = '';
  @Output() added = new EventEmitter<string>();

  add() {
    this.added.emit(this.key);
  }
}
