import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PostsRoutingModule } from './posts-routing.module';

import {MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { PostsComponent } from './posts.component';
import { PostService } from '../services/post.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../components/loader/loader.service';
import { LoaderComponent } from '../components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatListModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [PostService, LoaderService],
  declarations: [LoaderComponent, PostsComponent, PostListComponent, PostDetailsComponent]
})
export class PostsModule { }
