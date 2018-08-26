import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtAuthService } from '../../../services/jwt-auth.service';
import { AuthService } from '../../../services/auth-service.service';
import { UserService } from '../../../services/user.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { CommentService } from '../../../services/comment.service';
import { Observable } from 'rxjs';
import { PostsComponent } from '../../admin/posts/posts.component';
import { NgForm } from '@angular/forms';
import { TransferDataService } from '../../../services/transfer-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { database } from 'firebase';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  isCollapsed = false;
  public post = [];
  public user = [];
  public currentUser;
  public postCategory = [];
  public postImage = [];
  public imageUrl = 'assets/images/placeholdImage.jpg';
  public postComments = [];
  public childrenComments = [];
  public isLoggedIn: boolean;
  public hasPost: boolean;
  public hasComments: boolean;
  public isLike: boolean;
  public isReply: boolean;
  public isLoading = true;
  public parent_id;
  public countLike;
  public countDislike;
  private _postSlug;
  public onShow;
  public comment_form = {
    content: null,
    user_id: null,
    post_id: null
  }

  public replycomment_form = {
    content: null,
    user_id: null,
    post_id: null,
    parent_id: null
  }

  
  public replychildrencomment_form = {
    user_name: null,
    content: null,
    user_id: null,
    post_id: null,
    parent_id: null
  }

  public form = {
    isLike: null,
    user_id: null,
    post_id: null
  }

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _jwt: JwtAuthService,
    private _auth: AuthService,
    private _userService: UserService,
    private _notify: SnotifyService,
    private _commentService: CommentService,
    private _router: Router,
    private _transferData: TransferDataService,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.hasPost = true;
    this._auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this._route.params.subscribe(param => {
      this._postSlug = param.slug;
      this.getPost(this._postSlug);
      let token = localStorage.getItem('token');
      if (token) {
        this.getUser(token);
      }
    });
  }

  getPost(slug) {
    this._postService.getPost(this._postSlug).subscribe(

      data => {
        this.handlePostData(data);
        this.isLoading = false;
        this.hasPost = true;
      },
      error => {
        this.hasPost = false;
      }
    )
  }

  handlePostData(data) {
    this.post = data.data;
    this.postCategory = data.data.categories;
    this.postImage = data.data.images;
    if (this.postImage.length > 0) {
      this.imageUrl = 'http://localhost:8000/images/' + this.postImage[0].image;
    }
    // this.postComments = data.data.comments;
    this.comment_form.post_id = data.data.id;
    this.replycomment_form.post_id = data.data.id;
    this.replychildrencomment_form.post_id = data.data.id;
    this.form.post_id = data.data.id;
    this.getPostComment(data.data.id);
    this.getChildrenComment(data.data.id);
    this.countLikeDislike(data.data.id);
    this.getLikeDislike(data.data.id);
  }

  getUser(token) {
    this._userService.getUser(token).subscribe(
      data => {
        this.handleUserData(data);
      }
    )
  }

  handleUserData(data) {
    this.comment_form.user_id = data.id;
    this.replycomment_form.user_id = data.id;
    this.replychildrencomment_form.user_id = data.id;
    this.form.user_id = data.id;
  }

  onSubmit(form: NgForm) {
    this._commentService.postComment(this.comment_form).subscribe(
      data => this.handleResponse(data),
      error => this._notify.error('Something went wrong!', 'Error')
    )
    form.reset();
  }

  onReply(parent_id, form: NgForm) {
    this.replycomment_form.parent_id = parent_id;
    this._commentService.postComment(this.replycomment_form).subscribe(
      data => this.handleReply(data),
      error => this._notify.error('Something went wrong!', 'Error')
    )
    form.reset();
  }

  onReplyChildrenComment(parent_id, form: NgForm) {
    this.replychildrencomment_form.parent_id = parent_id;
    this._commentService.postComment(this.replychildrencomment_form).subscribe(
      data => {this.handleReply(data); this.isReply = false},
      error => this._notify.error('Something went wrong!', 'Error')
    )
    form.reset();
  }

  handleResponse(data) {
    this.postComments.push(data.comment);
  }

  handleReply(data) {
    this.childrenComments.push(data.comment);

  }

  getPostComment(post_id) {
    this._commentService.getComments(post_id).subscribe(
      data => this.handleCommentsData(data)
    );
  }

  handleCommentsData(data) {
    this.postComments = data;
  }

  getChildrenComment(post_id) {
    this._commentService.getChildrenComments(post_id).subscribe(
      data => this.handleChildrenCommentsData(data)
    );
  }

  handleChildrenCommentsData(data) {
    this.childrenComments = data;

  }

  onLike(post) {
    if (this.isLike == false) {
      this.countDislike = this.countDislike - 1;
    }
    this.form.isLike = 1;
    this.isLike = true;
    this.countLike = this.countLike + 1;
    this._postService.updateLikeDislike(this.form).subscribe(
      data => {
        console.log('like');
      }
    );
  }

  onDislike(post) {
    if (this.isLike == true) {
      this.countLike = this.countLike - 1;
    }
    this.isLike = false;
    this.form.isLike = 0;
    this.countDislike = this.countDislike + 1;
    this._postService.updateLikeDislike(this.form).subscribe(
      data => {
        console.log('dislike');
      }
    );
  }

  countLikeDislike(id) {
    this._postService.countLikeDislike(id).subscribe(
      data => this.handleCount(data)
    )
  }

  handleCount(data) {
    this.countLike = data.like;
    this.countDislike = data.dislike;
  }


  getLikeDislike(id) {
    this._postService.getLikeDislike(id).subscribe(
      data => this.handleLikeDislikeData(data)
    )
  }

  handleLikeDislikeData(data) {
    let token = localStorage.getItem('token');
    if (token) {
      this._userService.getUser(token).subscribe(
        userData => {
          this.handle(data, userData)
        });
    }
  }

  handle(data, userData) {
    this.user = userData;
    data.like.forEach(like => {
      if (like.user_id == userData.id) {
        this.isLike = true;
      }
    });
    data.dislike.forEach(dislike => {
      if (dislike.user_id == userData.id) {
        this.isLike = false;
      }
    });
  }

  onEdit(post, user) {
    if (post.user_id == user.id) {
      this._router.navigate([`/posts/${this._postSlug}/edit`]);
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
          { text: 'Cancel', action: (toast) => { this._notify.remove(toast.id); } },
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

  deletePost(post) {
    this._postService.deletePost(post.id).subscribe(
      data => { this.handleDelete(data) }
    )
  }

  handleDelete(data) {
    this._notify.success(data.message, 'Success');
    this._router.navigate(['/'])
  }

  onDeleteComment(post, comment, user, i) {
    if (comment.user_id == user.id || post.user_id == user.id) {
      this._notify.confirm(`Confirm delete`, 'Confirm', {
        buttons: [
          { text: 'Delete', action: (toast) => { this.deleteComment(comment, i); this._notify.remove(toast.id); }, bold: true },
          { text: 'Cancel', action: (toast) => { this._notify.remove(toast.id); } },
        ]
      });
    } else {
      this._notify.confirm('Cannot delete this comment', 'Error', {
        timeout: 5000,
        showProgressBar: false,
        buttons: [
          { text: 'Okay', action: (toast) => { this._notify.remove(toast.id); }, bold: true },
        ]
      });
    }
  }

  deleteComment(comment, i) {
    this._commentService.deleteComment(comment.id).subscribe(
      data => {
        this.handleDeleteComment(data);
        this.postComments.splice(i, 1);
      }
    )
  }

  handleDeleteComment(data) {
    this._notify.success(data.message, 'Success');

  }

  onDeleteChildrenComment(post, comment, user, i) {
    if (comment.user_id == user.id || post.user_id == user.id) {
      this._notify.confirm(`Confirm delete`, 'Confirm', {
        buttons: [
          { text: 'Delete', action: (toast) => { this.deleteChildrenComment(comment, i); this._notify.remove(toast.id); }, bold: true },
          { text: 'Cancel', action: (toast) => { this._notify.remove(toast.id); } },
        ]
      });
    } else {
      this._notify.confirm('Cannot delete this comment', 'Error', {
        timeout: 5000,
        showProgressBar: false,
        buttons: [
          { text: 'Okay', action: (toast) => { this._notify.remove(toast.id); }, bold: true },
        ]
      });
    }
  }

  deleteChildrenComment(comment, i) {
    this._commentService.deleteComment(comment.id).subscribe(
      data => {
        this.handleDeleteComment(data);
        this.childrenComments.splice(i, 1);
      }
    )
  }

  onEditComment(comment, user) {
    if (comment.user_id == user.id) {
    } else {
      this._notify.confirm('Cannot edit this comment', 'Error', {
        timeout: 5000,
        showProgressBar: false,
        buttons: [
          { text: 'Okay', action: (toast) => { this._notify.remove(toast.id); }, bold: true },
        ]
      });
    }
  }

  onUpdate(comment) {
    this._commentService.updateComment(comment).subscribe(
      data => this.handleUpdate(data, comment)
    )
  }

  handleUpdate(data, comment) {
    comment = data;
    this._notify.success('Success');
    this.onShow = false;
  }

  onCancel() {
    this.onShow = false;
  }

  onReplyChildren(childrenCmt) {
    this.replychildrencomment_form.user_name = `@${childrenCmt.users.name}`;
    this.replychildrencomment_form.content = this.replychildrencomment_form.user_name + ' ';
    this.replychildrencomment_form.parent_id = childrenCmt.parent_id;
    this.isReply = true;
  }
  
  onCancelReply(){
    this.isReply = false;
  }
}
