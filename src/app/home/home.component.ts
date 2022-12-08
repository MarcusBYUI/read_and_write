import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post-model';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private PostService: PostService) {}

  ngOnInit(): void {
    this.PostService.getPosts().subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
