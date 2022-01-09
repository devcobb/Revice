import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lastest-posts-view',
  templateUrl: './lastest-posts-view.component.html',
  styleUrls: ['./lastest-posts-view.component.scss']
})
export class LastestPostsViewComponent implements OnInit {
  availableCategories = [
    { name: "film" },
    { name: "serial" },
    { name: "game" },
    { name: "music" }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
