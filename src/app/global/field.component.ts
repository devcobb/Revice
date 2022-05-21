import { EventEmitter, Injectable } from '@angular/core';
import {
  BannerField,
  GalleryField,
  HeadingField,
  ImageField,
  RatingField,
  TextField,
} from './global-interfaces';

@Injectable()
export class FieldComponent {
  data = {} as
    | TextField
    | ImageField
    | BannerField
    | RatingField
    | GalleryField
    | HeadingField;

  changedData = new EventEmitter<
    | TextField
    | ImageField
    | BannerField
    | RatingField
    | GalleryField
    | HeadingField
  >();
  fieldRemoved = new EventEmitter<number>();

  constructor() {}

  update(attr: string, value: string) {
    this.data[attr] = value;
    this.changedData.emit(this.data);
  }

  remove() {
    this.fieldRemoved.emit(this.data.id);
  }
}
