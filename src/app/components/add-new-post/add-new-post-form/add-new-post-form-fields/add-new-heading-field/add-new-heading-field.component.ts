import { Component } from '@angular/core';
import { FieldComponent } from 'src/app/global/field.component';

@Component({
  selector: 'app-add-new-heading-field',
  templateUrl: './add-new-heading-field.component.html',
  styleUrls: ['./add-new-heading-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved'],
  inputs: ['data'],
})
export class AddNewHeadingFieldComponent extends FieldComponent {}
