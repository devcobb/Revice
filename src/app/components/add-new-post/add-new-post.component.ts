import { Component, OnInit } from '@angular/core';

interface Category {
  name: string;
}

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
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss']
})
export class AddNewPostComponent implements OnInit {
  availableCategories: Category[] = [
    { name: "film" },
    { name: "serial" },
    { name: "game" },
    { name: "music" }
  ];
  choosedCategory = {} as Category;
  choosed = false;
  fields: (TextField | ImageField | BannerField)[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  updateCurrentChoosedCategory(category: string) {
    this.choosedCategory = this.availableCategories.filter(cat => cat.name === category)[0];
  }

  showAddingPostScreen() {
    if (this.choosedCategory.name !== undefined) {
      this.choosed = true
    }
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

  removeElement(id: number) {
    this.fields = this.fields.filter(field => field.id !== id)
  }

  changeArrangement(id: number) {
    let fieldToChange = <BannerField>this.fields.find(field => field.id === id && field.type === 'banner');
    console.log(fieldToChange)
    fieldToChange.arrangement === 'text-image' ? fieldToChange.arrangement = "image-text" : fieldToChange.arrangement = "text-image";
    console.log(fieldToChange)
  }
}
