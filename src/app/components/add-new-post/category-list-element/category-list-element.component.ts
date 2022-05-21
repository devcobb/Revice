import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-list-element',
  templateUrl: './category-list-element.component.html',
  styleUrls: ['./category-list-element.component.scss'],
})
export class CategoryListElementComponent implements OnInit {
  @Input() categoryName = '';
  @Output() choosedCategory = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  chooseCategory(evt: Event, name: string) {
    //CLEAR ANY CURRENTLY CHOOSED ELEMENT
    document
      .querySelectorAll('.category-list-element')
      .forEach(
        (elem) =>
          (elem.className = elem.className.replace('choosed-category', ''))
      );

    let element = <HTMLDivElement>evt.target;
    element.className += ' choosed-category';
    this.choosedCategory.emit(name);
  }
}
