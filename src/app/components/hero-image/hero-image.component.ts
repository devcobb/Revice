import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent {
  @Input() height: string = "100vh";
  @Input() imageID: number = 1;
  @Input() content: boolean = true;
  @Input() wave: boolean = false;
}
