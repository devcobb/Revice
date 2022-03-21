import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Post } from '../global-interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.postSetUp();
  }

  async postSetUp() {
    this.post.url = `/post/${this.post.title.replace(/\s/g, '-')}-${this.post.id}`;
    this.post.userUrl = `/user/${this.post.author.replace(/\s/g, '-')}`
    this.post.thumbnail = "";
    this.post.thumbnail = await this.databaseService.getThumbnail(`post_thumbails/${this.post.id}-${this.post.title}-thumnbail`);
  }
}
