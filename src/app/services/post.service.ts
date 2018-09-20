import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { 
    
  }

  getPost(id?: number) : Observable<Object[]> {
    let postId = isNaN(id) ? '' : '/' + id;
    return this.http.get<Object[]>('http://jsonplaceholder.typicode.com/posts' + postId);
  }

  updatePost(postId: number, data: Object) : Observable<any> {
    return this.http.put('http://jsonplaceholder.typicode.com/posts/' + postId, data);
  }

}
