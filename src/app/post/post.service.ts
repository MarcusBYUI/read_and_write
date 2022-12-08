import { Injectable } from '@angular/core';
import { Post } from './post-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  //returns a Post by id
  getPost(id: string) {
    return this.http.get<Post>('http://localhost:3000/api/' + id);
  }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:3000/api');
  }

  addPost(post: Post) {
    if (!post) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    return this.http.post<{ message: string; post: Post }>(
      'http://localhost:3000/api',
      post,
      { headers: headers }
    );
  }

  updatePost(id: string, newPost: Post) {
    if (!id || !newPost) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    return this.http.put('http://localhost:3000/api/' + id, newPost, {
      headers: headers,
    });
  }

  deletePost(id: string) {
    if (!id) {
      return;
    }
    // delete from database
    return this.http.delete('http://localhost:3000/api/' + id);
  }
}
