import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  showLoader: boolean = false;
  post: Object = null;
  
  title = new FormControl('');
  body = new FormControl('');
  postId = new FormControl('');

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showLoader = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      let postId = params['postId'];
      this.postService.getPost(postId).subscribe((res: Object) => { 
          //console.log(res);
          this.postId.setValue(res.id);
          this.title.setValue(res.title);
          this.body.setValue(res.body);
          this.showLoader = false;
        });      
    });
  }

  updatePost() {
    this.showLoader = true;
    let data = {
      title: this.title.value,
      body: this.body.value
    };
    this.postService.updatePost(this.postId.value, data).subscribe((resp: any) => { 
        console.log(resp) 
        this.showLoader = false;
      });
  }

}
