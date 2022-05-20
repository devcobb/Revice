import { Component, OnInit } from '@angular/core';
import { ExtendedFieldComponent } from 'src/app/global/extendedField.component';

@Component({
  selector: 'app-add-new-banner-field',
  templateUrl: './add-new-banner-field.component.html',
  styleUrls: ['./add-new-banner-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved', 'changedArrangement'],
  inputs: ['data'],
})
export class AddNewBannerFieldComponent
  extends ExtendedFieldComponent
  implements OnInit
{
  ngOnInit(): void {
    this.data.value = '';
  }
}
