import { Component, OnInit } from '@angular/core';

interface Category {
  name: string;
}

interface TextField {
  type: 'image' | 'text' | 'banner';
  value: string;
  id: number;
}

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
  fields: TextField[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  updateCurrentChoosedCategory(category: string){
    this.choosedCategory = this.availableCategories.filter(cat => cat.name === category)[0];
  }

  showAddingPostScreen(){
    if(this.choosedCategory.name !== undefined){
      this.choosed = true
    }
  }

  addText(){
    this.fields.push(
      {
        type: 'text',
        value: "",
        id: this.fields.length
      }
    )
  }
}
