import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { 
    
  }

  getPost() : Observable<Post[]> {
    return this.http.get<Post[]>('http://jsonplaceholder.typicode.com/posts');
  }

  getPostById(postId: number) : Observable<Post> {
    return this.http.get<Post>('http://jsonplaceholder.typicode.com/posts/' + postId);
  }

  updatePost(postId: number, data: Object) : Observable<Post> {
    return this.http.put<Post>('http://jsonplaceholder.typicode.com/posts/' + postId, data);
  }

  deletePost(postId: number)  {
    return this.http.delete('http://jsonplaceholder.typicode.com/posts/' + postId, { observe: 'response'});
  }

  addPost(post: Post) : Observable<Post> {
    return this.http.post<Post>('http://jsonplaceholder.typicode.com/posts/', post);
  }

}
