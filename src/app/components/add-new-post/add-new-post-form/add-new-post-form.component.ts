import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/global/auth/auth.service';
import { DatabaseService } from 'src/app/global/database.service';
import {
  BannerField,
  Category,
  EPossibleErrors,
  GalleryField,
  HeadingField,
  ImageField,
  PossibleErrors,
  RatingField,
  Star,
  TextField,
} from 'src/app/global/global-interfaces';
import { ErrorMessagesService } from '../../error-messages/error-messages-service.service';

@Component({
  selector: 'app-add-new-post-form',
  templateUrl: './add-new-post-form.component.html',
  styleUrls: ['./add-new-post-form.component.scss'],
})
export class AddNewPostFormComponent {
  @Input() category = <Category>{};
  @Output() choosedCategory = '';
  @Output() previewedFields = new EventEmitter<
    (
      | TextField
      | ImageField
      | BannerField
      | RatingField
      | GalleryField
      | HeadingField
    )[]
  >();
  @Output() thumbnailImage = new EventEmitter<string>();
  @Output() needPreview = new EventEmitter<boolean>();
  @Output() postTitle = new EventEmitter<string>();
  @Output() postRatings = new EventEmitter<Star[]>();
  fields: (
    | TextField
    | ImageField
    | BannerField
    | RatingField
    | GalleryField
    | HeadingField
  )[] = [];
  addPostButtonDisabled = true;
  previewPostButtonDisabled = false;
  errorMessage = true;
  private = false;
  preview = false;
  title = '';
  thumbnail = '';
  stars: Star[] = [];

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private router: Router,
    private errorMessageService: ErrorMessagesService
  ) {
    this.stars = this.ratingArray;
  }

  ngOnInit() {
    //SET CATEGORY
    this.choosedCategory = this.category.name;

    //HANDLING RATING ERRORS
    this.errorMessageService.ratingAdded.subscribe((value) => {
      // this.checkForEnablingButtons();
    });
  }

  ngOnChanges() {
    //  this.checkForEnablingButtons();
  }

  //UPDATE CATEGORY
  updateCategory(category: Category) {
    this.category = category;
  }

  //INIT FIELD'S OBJECT
  addField(
    fieldType: 'image' | 'text' | 'banner' | 'rating' | 'gallery' | 'heading'
  ) {
    switch (fieldType) {
      case 'text':
        this.fields.push({
          type: fieldType,
          value: '',
          title: '',
          id: this.fields.length,
        });
        break;
      case 'image':
        this.fields.push({
          type: fieldType,
          src: '',
          id: this.fields.length,
        });
        break;
      case 'banner':
        this.fields.push({
          type: fieldType,
          value: '',
          src: '',
          title: '',
          id: this.fields.length,
          arrangement: 'image-text',
        });
        break;
      case 'rating':
        this.fields.push({
          type: fieldType,
          value: '',
          src: '',
          title: '',
          id: this.fields.length,
          arrangement: 'image-text',
          rating: this.ratingArray,
        });
        break;
      case 'gallery':
        this.fields.push({
          type: fieldType,
          images: [],
          id: this.fields.length,
          galleryType: 'one-big-four-small',
          arrangement: 'image-text',
        });
        break;
      case 'heading':
        this.fields.push({
          type: fieldType,
          src: '',
          id: this.fields.length,
          title: '',
        });
        break;
    }

    //this.checkForEnablingButtons();
  }

  //INIT RATING'S ARRAY
  get ratingArray() {
    let arr: Star[] = [];

    for (let i = 0; i < 10; i++) {
      arr.push({ id: i, filled: false });
    }
    return arr;
  }

  //UPDATE FIELD
  updateField(
    data:
      | TextField
      | ImageField
      | BannerField
      | RatingField
      | GalleryField
      | HeadingField
  ) {
    let updatedField = this.fields.find((field) => {
      if (field.id === data.id) {
        field = data;
      }
    });
  }

  //UPDATE IMAGE FIELDS
  updateImageField(id: number, value: string) {
    let fieldToUpdate = this.fields.filter(
      (field) => field.id === id
    )[0] as GalleryField;

    fieldToUpdate.images.push(value);
  }

  //UPDATE TITLE
  updateTitle(value: string) {
    this.title = value;

    //this.checkForEnablingButtons();
  }

  //UPDATE THUMBNAIL
  updateThumbnail(image: string) {
    this.thumbnail = image;

    // this.checkForEnablingButtons();
  }

  //REMOVE ELEMENT
  removeElement(id: number) {
    this.fields = this.fields.filter((field) => field.id !== id);

    //  this.checkForEnablingButtons();
  }

  //CHANGE ARRANGEMENT
  changeArrangement(id: number) {
    let fieldToChange = <BannerField | RatingField | GalleryField>(
      this.fields.find(
        (field) =>
          field.id === id &&
          (field.type === 'banner' ||
            field.type === 'rating' ||
            field.type === 'gallery')
      )
    );
    fieldToChange.arrangement === 'text-image'
      ? (fieldToChange.arrangement = 'image-text')
      : (fieldToChange.arrangement = 'text-image');
  }

  //UPDATE GALLERY TYPE
  updateGalleryType(data: GalleryField) {
    let fieldToChange = <GalleryField>(
      this.fields.find(
        (field) => field.id === data.id && field.type === 'gallery'
      )
    );

    fieldToChange.galleryType === 'four-small'
      ? (fieldToChange.galleryType = 'one-big-four-small')
      : (fieldToChange.galleryType = 'four-small');
  }

  //PREVIEW TOGGLE
  previewToggle(event: Event) {
    event.preventDefault();
    this.preview = true;

    this.previewedFields.emit(this.fields);
    this.needPreview.emit(this.preview);
    this.thumbnailImage.emit(this.thumbnail);
    this.postTitle.emit(this.title);
    this.postRatings.emit(this.stars);
  }

  async addNewPost(event: Event) {
    event.preventDefault();
    //GET USER'S DATA
    let userData = await this.authService.userData();

    //ADD NEW POST TO DATABASE
    await this.dbService.addPost(
      this.dbService.postId(),
      this.thumbnail,
      this.title,
      this.fields,
      this.private,
      await userData.username,
      await userData.uid,
      this.stars,
      this.category
    );

    //NAVIGATE USER TO LATEST POSTS SECTION
    await this.router.navigate(['/latest']);
  }

  //CHANGE POST VISIBILITY
  updatePostVisibility(input: HTMLLabelElement) {
    let enabled = document.querySelector('.input-switch-wrap .enabled');
    let disabled = document.querySelector('.input-switch-wrap .disabled');

    enabled!.className = enabled!.className.replace('enabled', 'disabled');
    disabled!.className = disabled!.className.replace('disabled', 'enabled');
    this.private = !this.private;
  }

  //HANDLING DISABLING BUTTONS
  checkForEnablingButtons() {
    let possibleErrors: PossibleErrors = {
      textFieldLength: true,
      imageFieldNoData: true,
      bannerNoData: true,
      noFieldsAdded: this.fields.length === 0,
      titleLength: this.title.length < 5 || this.title.length > 50,
      noThumbnail: this.thumbnail === '',
      noRatings: this.stars.filter((star) => star.filled).length === 0,
      userNotExists: JSON.parse(localStorage.getItem('user')!) === null,
    };

    this.addPostButtonDisabled = false;
    this.previewPostButtonDisabled = false;

    //Add post Button
    if (
      possibleErrors.userNotExists ||
      possibleErrors.noFieldsAdded ||
      possibleErrors.noRatings ||
      possibleErrors.titleLength ||
      possibleErrors.noThumbnail
    ) {
      this.addPostButtonDisabled = true;
    } else {
      if (!this.validateAddedFields(possibleErrors)) {
        this.addPostButtonDisabled = true;
      }
    }

    //Previw post button
    if (
      possibleErrors.noFieldsAdded ||
      possibleErrors.noRatings ||
      possibleErrors.titleLength ||
      possibleErrors.noThumbnail
    ) {
      this.previewPostButtonDisabled = true;
    } else {
      if (!this.validateAddedFields(possibleErrors)) {
        this.previewPostButtonDisabled = true;
      }
    }

    this.showErrorMessage(possibleErrors);
  }

  //CHECK FOR VALIDATION FIELDS
  validateAddedFields(possibleErrors: PossibleErrors) {
    let validate = true;

    this.fields.forEach((field) => {
      if (field.type === 'text') {
        if (
          (field.title.length < 5 && field.title.length > 50) ||
          field.value.length < 10 ||
          field.value.length > 550
        ) {
          possibleErrors.textFieldLength = false;
          validate = false;
        }
      } else if (field.type === 'image') {
        if (field.src.length === 0) {
          possibleErrors.imageFieldNoData = false;
          validate = false;
        }
      } else if (field.type === 'banner') {
        if (field.title) {
          if (
            (field.title.length < 5 && field.title.length > 50) ||
            field.value.length < 10 ||
            field.value.length > 550 ||
            field.src.length === 0
          ) {
            possibleErrors.bannerNoData = false;
            validate = false;
          }
        }
      }
    });

    this.showErrorMessage(possibleErrors);
    return validate;
  }

  //SHOW ERROR MESSAGE
  showErrorMessage(possibleErrors: PossibleErrors) {
    //View Errors
    if (Object.values(possibleErrors).some((e) => e)) {
      this.errorMessage = true;
      for (const error in possibleErrors) {
        if (EPossibleErrors[error as keyof typeof EPossibleErrors]) {
          this.errorMessageService.validate(
            possibleErrors[error as keyof typeof possibleErrors],
            EPossibleErrors[error as keyof typeof EPossibleErrors]
          );
        }
      }
    } else {
      this.errorMessageService.message.next('');
      this.errorMessage = false;
    }
  }
}
