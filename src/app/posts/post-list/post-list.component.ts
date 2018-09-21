import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Object[] = null;
  showLoader: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost().subscribe((resp: Object[]) => { 
      this.posts = resp;
      this.showLoader = false; 
    });
  }

  addedPost(event) {
    event.id = this.posts.length + 1;
    console.log('addedPost', event);
    this.posts.push(event);
  }

}
