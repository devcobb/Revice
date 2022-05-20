import { Component } from '@angular/core';
import { ExtendedFieldComponent } from 'src/app/global/extendedField.component';

@Component({
  selector: 'app-add-new-rating-field',
  templateUrl: './add-new-rating-field.component.html',
  styleUrls: ['./add-new-rating-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved', 'changedArrangement'],
  inputs: ['data'],
})
export class AddNewRatingFieldComponent extends ExtendedFieldComponent {}
