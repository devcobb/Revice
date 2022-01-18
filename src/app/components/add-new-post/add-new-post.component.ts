import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/global/global-interfaces';

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
}
