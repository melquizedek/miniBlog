import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = null;
  showLoader: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
    
    if (localStorage.getItem('posts')) {
      //console.log('from localStorage');
      this.posts = JSON.parse(localStorage.getItem('posts'));
    } else {
      this.postService.getPost().subscribe((resp: Post[]) => { 
        this.posts = resp;
        localStorage.setItem('posts', JSON.stringify(resp));
      });
      //console.log('from ajax');
    }

    this.showLoader = false;
  }

  addedPost(event) {
    //event.id = this.posts.length + 1;
    console.log('addedPost', event);
    this.posts.unshift(event);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
  
}
