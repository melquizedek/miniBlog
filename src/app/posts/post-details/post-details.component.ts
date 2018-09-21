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
        let postId = params['postId'];
        this.postService.getPostById(postId)
          .subscribe((res: Post) => { 
              //console.log(res);
              this.postId = res.id;
              this.title.setValue(res.title);
              this.body.setValue(res.body);
              this.showLoader = false;
            });      
      });
  }

  updatePost() : void {
      this.showLoader = true;
      
      let data = {
        title: this.title.value,
        body: this.body.value
      };

      this.postService.updatePost(this.postId, data)
        .subscribe((resp: Post) => {
            console.log('API response: ', resp);
            this.showLoader = false;
            this.router.navigate(['posts/list']);
          });
  }

  deletePost() : void {
    this.showLoader = true;
    this.postService.deletePost(this.postId)
      .subscribe(resp => {
          console.log('API response: ', resp);
          if (resp.status === 200) {
            this.router.navigate(['posts/list']);
          }
          this.showLoader = false;
        })
  }

}
