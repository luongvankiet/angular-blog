import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ImageService } from '../../../services/image.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { RoutingStateService } from '../../../services/routing-state.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  @Input() user;
  @Input() coverImageUrl;
  @Input() avatarUrl;

  public file;
  constructor(
    private modalService: BsModalService,
    private _imageService: ImageService,
    private _notify: SnotifyService,
    private _router: Router,
    private _routingState: RoutingStateService,
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  onSetAvatar(image_id, user_id) {
    this._imageService.onSetAvatar(image_id, user_id).subscribe(
      data => this.setImage(data)
    )
  }

  setImage(data) {
    this.avatarUrl = 'http://localhost:8000/images/' + data.image;
    this.modalRef2.hide();
    this._router.navigate([this._routingState.getCurrentRoute()]);
  }

  onSetCoverImage(image_id, user_id) {
    this._imageService.onSetCoverImage(image_id, user_id).subscribe(
      data => this.setCoverImage(data)
    )
  }

  setCoverImage(data) {
    this.coverImageUrl = 'http://localhost:8000/images/' + data.image;
    this.modalRef.hide();
    this._router.navigate([this._routingState.getCurrentRoute()]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-lg' });
  }

  onUploadAvatar(files: File, user_id) {
    this.file = files[0];
    const uploadData = new FormData();
    uploadData.append('image', this.file, this.file.name);
    uploadData.append('user_id', user_id);
    uploadData.append('image_type', '1');

    this._imageService.uploadImage(uploadData).subscribe(
      data => this.handleUpload(data),
      error => this._notify.error('Something went wrong!', 'Error')
    )
  }

  onUploadCoverImage(files: File, user_id) {
    this.file = files[0];
    const uploadData = new FormData();
    uploadData.append('image', this.file, this.file.name);
    uploadData.append('user_id', user_id);
    uploadData.append('image_type', '3');

    this._imageService.uploadImage(uploadData).subscribe(
      data => this.handleUpload(data),
      error => this._notify.error('Something went wrong!', 'Error')
    )
  }

  handleUpload(data) {
    this.user.images.push(data);
    this._notify.success('Please choose image you want to display', 'Success', { timeout: 5000 });
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

    this.user.images.splice(index, 1);
  }

  onSubmit(user) {
    this._userService.updateUser(user).subscribe(
      data => {
        this.handleUpdate(data);
      },
      error => this._notify.error('Something went wrong!!', 'Error')
    )
  }

  handleUpdate(data) {
    this._notify.success('Successfully updated!', 'Success');
    this._router.navigate([`/profile/${data.user.id}`]);
  }
}
