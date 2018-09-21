import {Component, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {

  @Output() afterSaved: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(public dialog: MatDialog,
    private router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostAddDialogComponent, {
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
      console.log('close result = ', result);
      if (result) {
        this.afterSaved.emit(result);
        this.router.navigate(['posts/list']);
      }
    });
  }

}

@Component({
  selector: 'post-add-dialog',
  templateUrl: './post-add-dialog.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddDialogComponent {

  showLoader: boolean;

  postFormGroup = new FormGroup({
      title: new FormControl(),
      body: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<PostAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private postService: PostService) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addPost() : void {
    this.showLoader = true;
    this.postService.addPost(this.postFormGroup.value)
        .subscribe((resp: Post) => {
            this.showLoader = false;
            this.dialogRef.close(resp);
          });
  }

}