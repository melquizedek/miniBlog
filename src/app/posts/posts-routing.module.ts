import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: 'list',
        component: PostListComponent
      },
      {
        path: 'details/:postId',
        component: PostDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }