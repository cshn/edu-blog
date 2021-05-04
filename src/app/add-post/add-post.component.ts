import { Component, Inject } from '@angular/core';
import { AddPostService } from './add-post.service';
import { CommonService } from '../service/common.service';
import { Post } from '../models/post.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent {
 
  public post : Post;
 
  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public postData: Post, 
    private addPostService: AddPostService,
    private commonService: CommonService) {
      this.post = commonService.post_to_be_edited;
  }

  addPost() {
      if(this.post.title && this.post.description){
          if(this.post._id){
            console.log('update service is called, ' + this.post._id);
            this.addPostService.updatePost(this.post).subscribe(res =>{
              this.commonService.notifyPostAddition();
            });
          } else {
            console.log('add service is called');
            this.addPostService.addPost(this.post).subscribe(res =>{
              this.commonService.notifyPostAddition();
            });
          }
      } else {
          alert('Title and Description required');
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
    });
  }
 
}