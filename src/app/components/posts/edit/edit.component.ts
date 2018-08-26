import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { JwtAuthService } from '../../../services/jwt-auth.service';
import { CategoryService } from '../../../services/category.service';
import { SnotifyService } from 'ng-snotify';
import { RoutingStateService } from '../../../services/routing-state.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  modalRef: BsModalRef;
  public post = [];
  public postImages = [];
  public images = [];
  public imageUrl = 'assets/images/placeholdImage.jpg';
  public user = [];
  public categories = [];
  public isLoggedIn;
  private _postSlug;
  public file;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _jwt: JwtAuthService,
    private _notify: SnotifyService,
    private _routingState: RoutingStateService,
    private modalService: BsModalService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this._jwt.isLoggedIn();
    this._route.params.subscribe(
      param => {
        this._postSlug = param.slug;
        this.getPost(this._postSlug);
      });
    this.getCategories();
  }

  getPost(slug) {
    this._postService.getPost(slug).subscribe(
      data => {
        this.handlePostData(data);
      }
    )
    let token = localStorage.getItem('token');
    if (token) {
      this.getUser(token);
    }
  }

  handlePostData(data) {
    let user_id = localStorage.getItem('user_id');
    if (user_id == data.data.user_id) {
      this.post = data.data;
      this.postImages = data.data.images;
      if (this.postImages.length > 0) {
        this.imageUrl = 'http://localhost:8000/images/' + this.postImages[0].image;
      }
      this.getImage(data.data.id);
    } else {
      confirm('You cannot access this page');
      this._router.navigate([this._routingState.getPreviousUrl()]);
    }
  }

  getUser(token) {
    this._userService.getUser(token).subscribe(
      data => this.handleUserData(data)
    )
  }

  handleUserData(data) {
    this.user = data;
  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => this.handleCategoriesData(data)
    )
  }

  handleCategoriesData(data) {
    this.categories = data.data;
  }

  onUpload(files: File, post_id, user_id) {
    this.file = files[0];
    const uploadData = new FormData();
    uploadData.append('image', this.file, this.file.name);
    uploadData.append('user_id', user_id);
    uploadData.append('post_id', post_id);
    uploadData.append('image_type', '2');

    this._imageService.uploadImage(uploadData).subscribe(
      data => this.handleUpload(data),
      error => this._notify.error('Something went wrong!', 'Error')
    )
  }

  handleUpload(data) {
    this.images.push(data);
    this._notify.success('Please choose image you want to display', 'Success', {timeout: 5000});
  }

  onSubmit(post, user) {
    const uploadData = new FormData();
    uploadData.append('id', post.id);
    uploadData.append('title', post.title);
    uploadData.append('content', post.content);
    uploadData.append('user_id', user.id);
    uploadData.append('category_id', post.category_id);
    this._postService.updataPost(uploadData).subscribe(
      data => {
        this.handleEditPost(data);
      },
      error => this._notify.error('Something went wrong!!', 'Error')
    )
  }

  handleEditPost(data) {
    this._notify.success('Successfully updated!', 'Success');
    this._router.navigate([`/posts/${data.data.slug}`]);
  }

  onBack() {
    this._router.navigate([this._routingState.getPreviousUrl()])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  getImage(id) {
    this._imageService.getPostImage(id).subscribe(
      data => this.handleImage(data)
    )
  }

  handleImage(data) {
    this.images = data;
  }

  onSet(image_id, post_id, user_id) {
    this._imageService.onSetImage(image_id, post_id, user_id).subscribe(
      data => this.setImage(data)
    )
  }

  setImage(data) {
    this.imageUrl = 'http://localhost:8000/images/' + data.image;
    this.modalRef.hide();
  }

  onDelete(image_id, index) {
    this._notify.confirm(`Confirm delete`, 'Confirm', {
      buttons: [
        { text: 'Delete', action: (toast) => { this.deleteImage(image_id, index); this._notify.remove(toast.id); }, bold: true },
        { text: 'Cancel', action: (toast) => { this._notify.remove(toast.id); } },
      ]
    });
  }

  deleteImage(image_id, index) {
    this._imageService.deleteImage(image_id).subscribe(
      data => {
        this._notify.success(`Successfully deleted`, 'Success');
      }
    )

    this.images.splice(index, 1);
  }
}
