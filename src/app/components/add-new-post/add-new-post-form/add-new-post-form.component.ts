import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/global/auth/auth.service';
import { DatabaseService } from 'src/app/global/database.service';
import { BannerField, Category, ImageField, Star, TextField } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-add-new-post-form',
  templateUrl: './add-new-post-form.component.html',
  styleUrls: ['./add-new-post-form.component.scss']
})
export class AddNewPostFormComponent {
  @Input() category = <Category>{};
  @Output() choosedCategory = "";
  @Output() previewedFields = new EventEmitter<(TextField | ImageField | BannerField)[]>();
  @Output() thumbnailImage = new EventEmitter<string>();
  @Output() needPreview = new EventEmitter<boolean>();
  @Output() postTitle = new EventEmitter<string>();
  @Output() postRatings = new EventEmitter<Star[]>();
  fields: (TextField | ImageField | BannerField)[] = [];
  addPostButtonDisabled = true;
  private = false;
  preview = false;
  title = "";
  thumbnail = "";
  stars: Star[] = [];

  constructor(private dbService: DatabaseService, private authService: AuthService) {
    for (let i = 0; i < 10; i++) {
      this.stars.push({ id: i, filled: false, half: false })
    }
  }

  ngOnInit() {
    this.choosedCategory = this.category.name;
  }

  ngOnChanges() {
    this.disableAddingPosts();
  }

  chooseRating(star: Star) {
    this.clearRatings();

    let stars = document.querySelectorAll('.star');
    for (let i = star.id; i > -1; i--) {
      stars[i].className = "star star-filled";
      this.stars[i].filled = true;
    }
  }

  showHalfStar(star: HTMLDivElement) {
    if (star.dataset.id) {
      !this.stars[parseInt(star.dataset.id)].half ? star.className = "star star-half" : "star star-filled";
      this.stars[parseInt(star.dataset.id)].half = !this.stars[parseInt(star.dataset.id)].half;
    }
  }

  clearRatings() {
    document.querySelectorAll('.star').forEach(star => star.className = "star");
    this.stars.forEach(star => {
      star.filled = false;
      star.half = false;
    })
  }

  addField(fieldType: 'image' | 'text' | 'banner') {
    if (fieldType === 'text') {
      this.fields.push(
        {
          type: fieldType,
          value: "",
          title: "",
          id: this.fields.length,
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
          title: "",
          id: this.fields.length,
          arrangement: "image-text"
        }
      )
    }
  }

  updateField(id: number, attr: string, value: string) {
    let fieldToUpdate = this.fields.filter(field => field.id === id)[0];
    fieldToUpdate[attr] = value;
  }

  updateTitle(value: string) {
    this.title = value;
  }

  updateThumbnail(image: string) {
    this.thumbnail = image;
  }

  removeElement(id: number) {
    this.fields = this.fields.filter(field => field.id !== id)
  }

  changeArrangement(id: number) {
    let fieldToChange = <BannerField>this.fields.find(field => field.id === id && field.type === 'banner');
    fieldToChange.arrangement === 'text-image' ? fieldToChange.arrangement = "image-text" : fieldToChange.arrangement = "text-image";
  }

  previewToggle(event: Event) {
    event.preventDefault();
    this.preview = true;

    this.previewedFields.emit(this.fields);
    this.needPreview.emit(this.preview);
    this.thumbnailImage.emit(this.thumbnail);
    this.postTitle.emit(this.title);
    this.postRatings.emit(this.stars)
  }

  async addNewPost(event: Event) {
    event.preventDefault();

    await this.dbService.addPost(this.dbService.postId(), this.thumbnail, this.title, this.fields, this.private, await this.authService.getUser(), this.stars);
  }

  updatePostVisibility(input: HTMLLabelElement) {
    let enabled = document.querySelector(".input-switch-wrap .enabled");
    let disabled = document.querySelector(".input-switch-wrap .disabled");

    enabled!.className = enabled!.className.replace("enabled", "disabled");
    disabled!.className = disabled!.className.replace("disabled", "enabled");
    this.private = !this.private;
  }

  disableAddingPosts() {
    if (!this.authService.getUser()) {
      this.addPostButtonDisabled = true
    }

    this.addPostButtonDisabled = false
  }

}
