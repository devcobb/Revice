import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/global/database.service';
import { Post } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit {
  posts: Post[] = [];
  needLoading = true;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.checkForPosts();
  }

  async checkForPosts() {
    let postsArr = []
    let promise = await this.databaseService.getPosts().then(data => {
      this.posts = data
    });

    await setTimeout(() => this.needLoading = false, 750)
  }
}
