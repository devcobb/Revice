import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BannerField,
  Category,
  ImageField,
  Star,
  TextField,
} from 'src/app/global/global-interfaces';
import { YearFieldData } from '../choose-year/choose-year.component';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewPostComponent {
  heroImageHeight = '60vh';
  imageID = '4';
  date = '';
  availableCategories: Category[] = [
    { name: 'movie' },
    { name: 'serial' },
    { name: 'game' },
    { name: 'music' },
  ];
  choosedCategory = {} as Category;
  choosed = false;
  fields: (TextField | ImageField | BannerField)[] = [];
  preview = false;
  title = '';
  thumbnail = '';
  ratings: Star[] = [];

  constructor() {}

  //UPDATE CURRENT CATEGORY
  updateCurrentChoosedCategory(category: string) {
    this.choosedCategory = this.availableCategories.filter(
      (cat) => cat.name === category
    )[0];
    this.choosed = true;
    this.heroImageHeight = '80vh';
    this.imageID = '3';
  }

  //TOGGLE PREVIEW SCREEN
  togglePreview(preview: boolean) {
    this.preview = preview;
  }

  //UPDATHE WHOLE FIELDS ARRAY
  updateFieldsData(data: (TextField | ImageField | BannerField)[]) {
    this.fields = data;
  }

  //UPDATE TITLE
  updateTitle(title: string) {
    this.title = title;
  }

  updateDate(date: YearFieldData) {
    if (date.year) {
      this.date = String(date.specifedYear);
    } else {
    }
  }

  //UPDATE THUMNBAIL
  updateThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
  }

  //UPDATE RATINGS
  updateRatings(ratings: Star[]) {
    this.ratings = ratings;
  }
}
