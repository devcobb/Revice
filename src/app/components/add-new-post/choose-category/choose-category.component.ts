import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
  @Input() category: string = "Category";

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    let list = document.querySelector(".list") as HTMLDivElement;
    let arrow = document.querySelector(".arrow") as HTMLImageElement;
    let categoryBtn = document.querySelector(".choose-category") as HTMLImageElement;

    if (list.className.includes('close')) {
      categoryBtn.className = categoryBtn.className.replace('choose-category-closed', 'choose-category-open');
      list.className = list.className.replace('close', 'open');
      arrow.className = arrow.className.replace('arrow-down', 'arrow-top');
    }
    else {
      list.className = list.className.replace('open', 'close');
      arrow.className = arrow.className.replace('arrow-top', 'arrow-down');
      categoryBtn.className = categoryBtn.className.replace('choose-category-open', 'choose-category-closed');
    }
  }

  updateCategory(target: HTMLLIElement) {
    let category = target.textContent;

    this.category = category!;
  }
}
