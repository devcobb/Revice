import { Component, EventEmitter, Output } from '@angular/core';
import { ExtendedFieldComponent } from 'src/app/global/extendedField.component';
import { GalleryField } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-add-new-gallery-field',
  templateUrl: './add-new-gallery-field.component.html',
  styleUrls: ['./add-new-gallery-field.component.scss'],
  outputs: ['changedData', 'fieldRemoved', 'changedArrangement'],
  inputs: ['data'],
})
export class AddNewGalleryFieldComponent extends ExtendedFieldComponent {
  @Output() changedType = new EventEmitter<GalleryField>();

  //CHANGE GALLERY'S TYPE
  changeType() {
    this.data.galleryType === 'four-small'
      ? (this.data.galleryType = 'one-big-four-small')
      : (this.data.galleryType = 'four-small');
  }

  //GET CUSTOM ID FOR UPLOAD IMAGE
  getCustomID() {
    let characters = '0123456789abcdefghijklmnoprstuwz';
    let randomID = '';

    for (let i = 0; i < 10; i++) {
      randomID += characters[Math.floor(Math.random() * characters.length)];
    }

    randomID += new Date().getTime();
    return `${this.data.id}-${randomID}`;
  }
}
