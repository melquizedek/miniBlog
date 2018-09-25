import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  showLoader: boolean = false;
  post: Post;
  title = new FormControl('');
  body = new FormControl('');
  postId: number;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    
    this.showLoader = true;

    this.activatedRoute.params.subscribe((params: Params) => {
        let postId = this.postId = params['postId'];

        this.postService.getPostById(postId)
              .subscribe((resp: Post) => { 
                  this.doPostView(resp.id);
                  this.showLoader = false;
                }, err => {
                  this.doPostView(this.postId);
                  this.showLoader = false;
                });

      });
  }

  private doPostView(postId: number) : Post {
    let selectedPost: Post = null;
    if (localStorage.getItem('posts')) 
    {
        let posts: Post[] = JSON.parse(localStorage.getItem('posts'));
        selectedPost = posts.find(function(post) {
          return post.id == postId;
        });
        console.log(selectedPost, 'selectedPost view');
        this.title.setValue(selectedPost.title);
        this.body.setValue(selectedPost.body);
    } 
    return selectedPost;
  }

  private doUpdate(postId: number, data: Post) : Post {
      let post: Post;
      if (localStorage.getItem('posts')) 
      {
          let posts: Post[] = JSON.parse(localStorage.getItem('posts'));
          post = posts.find(function(post, index) {
              if (post.id == postId) {
                posts.splice(index, 1, data);
                localStorage.setItem('posts', JSON.stringify(posts));
              }
              return post.id == postId;
          });   
      }
      return post;
  }

  updatePost() : void {
      this.showLoader = true;

      let data = {
        id: this.postId, 
        title: this.title.value,
        body: this.body.value
      };
      
      this.postService.updatePost(this.postId, data)
        .subscribe(resp => {
            console.log('API response: ', resp);
            this.doUpdate(this.postId, resp);
            this.showLoader = false;
            this.router.navigate(['posts/list']);
          }, err => {
            console.log('API response error: ', data);
            //if (err.status === 404) {
              this.doUpdate(this.postId, data);
            //}
            this.showLoader = false;
            this.router.navigate(['posts/list']);
          });
      
  }

  private doDelete(postId: number) : Post {
    let post: Post = null;
    if (localStorage.getItem('posts')) {
      var posts: Post[] = JSON.parse(localStorage.getItem('posts'));
      post = posts.find(function(post, index) {
        if (post.id == postId) { //console.log(postIdtoDel, 'postIdtoDel', index);
          posts.splice(index, 1);
          localStorage.setItem('posts', JSON.stringify(posts));
        }
        return post.id == postId;
      });
    }
    return post;
  }

  deletePost() : void {
    this.showLoader = true;
    this.postService.deletePost(this.postId)
      .subscribe(
        resp => {
          let post = this.doDelete(this.postId);
          console.log('deleted post: ', post);
          this.showLoader = false;
          this.router.navigate(['posts/list']);
        }, 
        err => {
          let post = this.doDelete(this.postId);
          console.log('deleted post in error: ', post);
          this.showLoader = false;
          this.router.navigate(['posts/list']);
        });
        
  }


}
