import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list-element',
  templateUrl: './category-list-element.component.html',
  styleUrls: ['./category-list-element.component.scss']
})
export class CategoryListElementComponent implements OnInit {
  @Input() categoryName = {};
  constructor() { }

  ngOnInit(): void {
  }

  chooseCategory(){
    
  }
}
