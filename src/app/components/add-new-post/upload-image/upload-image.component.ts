import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() id: number = 0;
  imageUploaded = false;
  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(event: Event) {
    let input = <HTMLInputElement>event.target;
    let label = <HTMLLabelElement>document.querySelector(`label[for="upload-image-${this.id}"]`);
    let bottomBar = label.children[0]

    bottomBar.className += " no-bg-color";

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (label !== null && e.target !== null) {
          this.imageUploaded = true;
          label.style.backgroundImage = `url(${e.target.result})`;
        }
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

}
