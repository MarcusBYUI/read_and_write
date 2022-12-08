import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  id: string;
  subscription: Subscription;
  postForm: FormGroup;

  post: Post = {
    _id: '',
    title: '',
    content: ``,
    excerpt: '',

    date: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PostService: PostService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.editMode = true;
      this.PostService.getPost(this.id).subscribe({
        next: (res) => {
          this.post = res;
          this.postForm = new FormGroup({
            title: new FormControl(this.editMode ? this.post.title : ''),
            content: new FormControl(this.editMode ? this.post.content : ''),
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }

  StripHTML(html: string) {
    return html.replace(/(<([^>]+)>)/gi, '');
  }

  onSubmit() {
    const text = this.StripHTML(this.postForm.value.content);

    const excerpt = text.slice(0, 90) + '...';
    const body = {
      _id: '',
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      excerpt: excerpt,
      date: new Date(),
    };

    if (this.editMode) {
      this.PostService.updatePost(this.id, body)?.subscribe({
        next: (res) => {
          alert('Post was updated successfully');
          this.router.navigateByUrl('/post/' + this.id);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      this.PostService.addPost(body)?.subscribe({
        next: (res) => {
          alert('Post was published successfully');
          this.router.navigateByUrl('/');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
