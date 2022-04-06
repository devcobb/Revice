import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BannerField, GalleryField, HeadingField, ImageField, Star, TextField } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.scss']
})
export class PreviewPostComponent implements OnInit {
  @Input() fields: (TextField | ImageField | BannerField | GalleryField | HeadingField)[] = [];
  @Input() title = "";
  @Input() thumbnail = "";
  @Input() stars: Star[] = [];
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    document.body.className = "no-scroll";
    console.log(this.fields)
  }

  closePreview() {
    document.body.className = ""
    this.close.emit(false)
  }
}
