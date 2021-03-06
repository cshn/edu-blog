import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
 
@Injectable()
export class CommonService {
 
    public postAdded_Observable = new Subject();
    public postEdit_Observable = new Subject();
    public post_to_be_edited;
 
    constructor(){
        this.post_to_be_edited = new Post();
    }
 
    notifyPostAddition(){
        this.postAdded_Observable.next();
        this.post_to_be_edited = new Post();
    }

    notifyPostEdit(){
        this.postEdit_Observable.next();
    }
     
    setPostToEdit(post: Post){
        this.post_to_be_edited = post;
        console.log(post);
        this.notifyPostEdit();
    }
 
}