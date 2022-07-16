import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BannerField,
  Category,
  GalleryField,
  HeadingField,
  ImageField,
  Star,
  TextField,
} from 'src/app/global/global-interfaces';
import { SlideShowService } from '../slide-show/slide-show.service';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.scss'],
})
export class PreviewPostComponent implements OnInit {
  @Input() fields: (
    | TextField
    | ImageField
    | BannerField
    | GalleryField
    | HeadingField
  )[] = [];
  @Input() title = '';
  @Input() date = '';
  @Input() category = {} as Category;
  @Input() thumbnail = '';
  @Input() stars: Star[] = [];
  @Output() close = new EventEmitter<boolean>();
  showSlideShow = false;
  slideShowImages: string[] = [];
  scrollDisabled = false;
  constructor(private slideShowService: SlideShowService) {}

  ngOnInit() {
    document.body.className = 'no-scroll';
    //trigger
    this.slideShowService.triggerSub.subscribe((value) => {
      this.showSlideShow = value;
    });

    //images
    this.slideShowService.imagesSub.subscribe((value) => {
      this.slideShowImages = value;
    });

    //scroll
    this.slideShowService.scrollSub.subscribe((value) => {
      this.scrollDisabled = value;
    });
  }

  closePreview() {
    document.body.className = '';
    this.close.emit(false);
  }

  getFieldArrangement(arrangement: string) {
    console.log(arrangement);
    return arrangement === 'image-text' ? false : true;
  }

  get categoryName() {
    return (
      this.category.name[0].toUpperCase() +
      this.category.name.slice(1, this.category.name.length)
    );
  }
}
