import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  modalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  public posts;
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private _postService: PostService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:  10,
    };
    this.getPosts();
  }

  getPosts() {
    this._postService.getAllPosts().subscribe(
      data => {
        this.handlePostsData(data);
      }
    )
  }

  handlePostsData(data) {
    this.posts = data.data;
    this.dtTrigger.next();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
