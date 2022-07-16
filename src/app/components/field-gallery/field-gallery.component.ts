import { Component, Input, OnInit } from '@angular/core';
import { SlideShowService } from '../slide-show/slide-show.service';

@Component({
  selector: 'app-field-gallery',
  templateUrl: './field-gallery.component.html',
  styleUrls: ['./field-gallery.component.scss'],
})
export class FieldGalleryComponent implements OnInit {
  @Input() images = [];
  @Input() type = '';
  @Input() arrangement = '';

  constructor(private slideShowService: SlideShowService) {}

  ngOnInit() {
    console.log(this.images);
  }

  showSlideShow() {
    this.slideShowService.updateTrigger(this.images);
  }
}
