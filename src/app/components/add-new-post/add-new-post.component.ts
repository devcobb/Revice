import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentHeightService } from 'src/app/global/content-height.service';
import { BannerField, Category, ImageField, Star, TextField } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewPostComponent implements OnInit {
  heroImageHeight = "60vh";
  imageID = "2";
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

  constructor(private cdr: ChangeDetectorRef, private contentHeightService: ContentHeightService) { }

  ngOnInit(): void { }

  updateCurrentChoosedCategory(category: string) {
    this.choosedCategory = this.availableCategories.filter(cat => cat.name === category)[0];
    this.choosed = true;
    this.heroImageHeight = "80vh";
    this.imageID = "3";

    this.contentHeightService.toggle();
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
