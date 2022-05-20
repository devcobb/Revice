import { Component } from '@angular/core';
import { FieldComponent } from 'src/app/global/field.component';

@Component({
  selector: 'app-add-new-image-field',
  templateUrl: './add-new-image-field.component.html',
  styleUrls: ['./add-new-image-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved'],
  inputs: ['data'],
})
export class AddNewImageFieldComponent extends FieldComponent {}
