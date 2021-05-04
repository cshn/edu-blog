import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { AddPostComponent } from '../add-post/add-post.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _id: string;
  title: string;
  description: string;
  @ViewChild('addPost') addBtn: ElementRef;

  constructor(public dialog: MatDialog, private commonService: CommonService, private router: Router){
    if(!localStorage.getItem('loggedInUser')){
      this.router.navigate(['/']);
    }
    
    this.commonService.postEdit_Observable.subscribe(res => {
      this.addBtn.nativeElement.click();
    });
  }

  ngOnInit(){ 
  }

  openDialog(): void {

    console.log('opening add/edit post window, ' + this.commonService.post_to_be_edited._id);

    if (this.commonService.post_to_be_edited._id) {
      this._id = this.commonService.post_to_be_edited._id;
      this.title = this.commonService.post_to_be_edited.title;
      this.description = this.commonService.post_to_be_edited.description;
      const dialogRef = this.dialog.open(AddPostComponent, {
        width: '350px',
        data: {id: this._id, title: this.title, description: this.description}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(AddPostComponent, {
        width: '350px',
        data: {id: '', title: '', description: ''}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }

  logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}

