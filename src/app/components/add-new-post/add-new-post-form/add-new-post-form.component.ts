import { Component, Input, Output } from '@angular/core';
import { Category } from 'src/app/global/global-interfaces';

interface TextField {
  type: 'text';
  value: string;
  id: number;
}

interface ImageField {
  type: 'image';
  src: string;
  id: number;
}

interface BannerField {
  type: 'banner';
  src: string;
  value: string;
  id: number;
  arrangement: "image-text" | "text-image"
}

@Component({
  selector: 'app-add-new-post-form',
  templateUrl: './add-new-post-form.component.html',
  styleUrls: ['./add-new-post-form.component.scss']
})
export class AddNewPostFormComponent {
  @Input() category = <Category>{};
  @Output() choosedCategory = "";
  fields: (TextField | ImageField | BannerField)[] = [];
  thumbnail: string = "";

  ngOnInit() {
    this.choosedCategory = this.category.name
  }

  addField(fieldType: 'image' | 'text' | 'banner') {
    if (fieldType === 'text') {
      this.fields.push(
        {
          type: fieldType,
          value: "",
          id: this.fields.length
        }
      )
    }
    else if (fieldType === 'image') {
      this.fields.push(
        {
          type: fieldType,
          src: "",
          id: this.fields.length
        }
      )
    }
    else {
      this.fields.push(
        {
          type: fieldType,
          value: "",
          src: "",
          id: this.fields.length,
          arrangement: "image-text"
        }
      )
    }
  }

  updateThumbnail($event: Event) {
    let image = $event.target as HTMLInputElement;
    this.thumbnail = image.value;
  }

  removeElement(id: number) {
    this.fields = this.fields.filter(field => field.id !== id)
  }

  changeArrangement(id: number) {
    let fieldToChange = <BannerField>this.fields.find(field => field.id === id && field.type === 'banner');
    fieldToChange.arrangement === 'text-image' ? fieldToChange.arrangement = "image-text" : fieldToChange.arrangement = "text-image";
  }
}
