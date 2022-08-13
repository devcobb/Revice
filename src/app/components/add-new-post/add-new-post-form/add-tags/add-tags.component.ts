import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Tag } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent implements OnInit {
  @Output() tags: Tag[] = [];
  @ViewChild('addNewTag') addTagInput!: ElementRef<HTMLInputElement>;
  @Output() tagAdded = new EventEmitter<Tag>();

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  addTag(keycode: string) {
    if (keycode === 'Enter') {
      if (
        !this.tags.find(
          (tag) => tag.content === this.addTagInput.nativeElement.value
        )
      ) {
        let tag = {
          content: this.addTagInput.nativeElement.value,
        };
        this.tags.push(tag);
        this.addTagInput.nativeElement.value = '';
        this.tagAdded.emit(tag);
        this.ref.detectChanges();
      }
    }
  }

  removeTag(content: string) {
    this.tags = this.tags.filter(
      (tag) => tag.content !== content.replace(/\n/g, '').trim()
    );
    this.ref.detectChanges();
  }
}
