import { Component, Input, OnInit } from '@angular/core';
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
export class AddNewPostFormComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() category = <Category>{};
  fields: (TextField | ImageField | BannerField)[] = [];
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

  removeElement(id: number) {
    this.fields = this.fields.filter(field => field.id !== id)
  }

  changeArrangement(id: number) {
    let fieldToChange = <BannerField>this.fields.find(field => field.id === id && field.type === 'banner');
    fieldToChange.arrangement === 'text-image' ? fieldToChange.arrangement = "image-text" : fieldToChange.arrangement = "text-image";
  }
}
