import { Component, OnInit } from '@angular/core';
import { FieldComponent } from 'src/app/global/field.component';

@Component({
  selector: 'app-add-new-text-field',
  templateUrl: './add-new-text-field.component.html',
  styleUrls: ['./add-new-text-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved'],
  inputs: ['data'],
})
export class AddNewTextFieldComponent extends FieldComponent implements OnInit {
  ngOnInit(): void {
    this.data.value = '';
  }
}
