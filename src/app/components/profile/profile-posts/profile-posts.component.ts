import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { SnotifyService } from 'ng-snotify';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  @Input() user = [];
  public currentUser = [];
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _notify: SnotifyService,
    private _router: Router,
    private _postService: PostService
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token){
      this.getCurrentUser(token);
    }
  }

  getCurrentUser(token){
    this._userService.getUser(token).subscribe(
      data => this.handleCurrentUserData(data)
    )
  }

  handleCurrentUserData(data) {
    this.currentUser = data;
  }

  onEdit(post, user) {
    if (post.user_id == user.id) {
      this._router.navigate([`/posts/${post.slug}/edit`]);
    } else {
      this._notify.confirm('Cannot edit this post', 'Error', {
        timeout: 5000,
        showProgressBar: false,
        buttons: [
          { text: 'Okay', action: (toast) => { this._notify.remove(toast.id); }, bold: true },
        ]
      });
    }
  }

  onDelete(post, user) {
    if (post.user_id == user.id) {
      this._notify.confirm(`Delete ${post.title}`, 'Confirm', {
        buttons: [
          { text: 'Delete', action: (toast) => { this.deletePost(post); this._notify.remove(toast.id); }, bold: true },
          { text: 'Cancel', action: (toast) => { this._notify.remove(toast.id); }},
        ]
      });
    } else {
      this._notify.confirm('Cannot delete this post', 'Error', {
        timeout: 5000,
        showProgressBar: false,
        buttons: [
          { text: 'Okay', action: (toast) => { this._notify.remove(toast.id); }, bold: true },
        ]
      });
    }
  }

  deletePost(post){
    this._postService.deletePost(post.id).subscribe(
      data => { this.handleDelete(data) }
    )
  }

  handleDelete(data){
    this._notify.success(data.message, 'Success');
    this._router.navigate(['/'])
  }

}
