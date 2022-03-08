import { Component, OnInit } from '@angular/core';
import { BannerField, Category, ImageField, Star, TextField } from 'src/app/global/global-interfaces';

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
  preview = false;
  title = "";
  thumbnail = "";
  ratings: Star[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  updateCurrentChoosedCategory(category: string) {
    this.choosedCategory = this.availableCategories.filter(cat => cat.name === category)[0];
    this.choosed = true
  }

  togglePreview(preview: boolean) {
    this.preview = preview;
  }

  updateFieldsData(data: (TextField | ImageField | BannerField)[]) {
    this.fields = data;
  }

  updateTitle(title: string) {
    this.title = title
  }

  updateThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
  }

  updateRatings(ratings: Star[]) {
    this.ratings = ratings;
  }
}
