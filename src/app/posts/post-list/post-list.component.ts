import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Object[] = null;
  showLoader: boolean = true;

  constructor(private postService: PostService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.postService.getPost().subscribe((resp: Object[]) => { 
      this.posts = resp;
      this.showLoader = false; 
    });
  }

}
