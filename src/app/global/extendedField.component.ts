import { EventEmitter, Injectable } from '@angular/core';
import { FieldComponent } from './field.component';

@Injectable()
export class ExtendedFieldComponent extends FieldComponent {
  changedArrangement = new EventEmitter<number>();

  arrangement() {
    this.changedArrangement.emit(this.data.id);
  }
}
