import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/global/database.service';
import { Post } from 'src/app/global/global-interfaces';
import { TimerService } from './timer.service';



@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private databaseService: DatabaseService, private timerService: TimerService) { }

  ngOnInit(): void {
    let locallyStoredPosts = sessionStorage.getItem("posts");

    if (locallyStoredPosts !== null) {
      this.posts = JSON.parse(locallyStoredPosts).posts;
      this.timerService.setTimer();
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

    await console.log(this.posts)
    await sessionStorage.setItem('posts', JSON.stringify({ posts: this.posts, time: Date.now() }));
  }
}
