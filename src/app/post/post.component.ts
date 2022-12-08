import { Component, OnInit } from '@angular/core';
import { Post } from './post-model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  id: string;
  subscription: Subscription;
  post: Post = {
    title: '',
    excerpt: '',
    content: '',
    date: new Date(),
    _id: '',
  };

  constructor(
    private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.PostService.getPost(this.id).subscribe({
        next: (res) => {
          this.post = res;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }

  onDelete() {
    this.PostService.deletePost(this.post._id)?.subscribe({
      next: () => {
        alert('Post was deleted successfully');
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
