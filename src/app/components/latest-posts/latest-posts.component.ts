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
  count = 0;
  counter = setInterval(() => {
    this.count++;
    if (this.count === 60) {
      this.count = 0;
      sessionStorage.clear();
      this.checkForPosts();
    }
  }, 1000)

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    let locallyStoredPosts = sessionStorage.getItem("posts");

    if (locallyStoredPosts !== null) {
      this.posts = JSON.parse(locallyStoredPosts).posts;
    }
    else {
      this.checkForPosts()
    }
  }

  async checkForPosts() {
    let postsArr = []
    let promise = await this.databaseService.getPosts().then(data => {
      this.posts = data
    });

    await sessionStorage.setItem('posts', JSON.stringify({ posts: this.posts, time: Date.now() }));
  }
}
