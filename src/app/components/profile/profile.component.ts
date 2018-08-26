import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { TransferDataService } from '../../services/transfer-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user = [];
  public currentUser = [];
  public images = [];
  public userId;
  public avatarUrl = 'assets/images/default_avatar.png';
  public coverImageUrl = 'assets/images/placeholder-image10.jpg';
  public isLoading = true;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _imageService: ImageService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(param => {
      this.getUser(param.id)
    })

    let token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser(token);
    }
  }

  getUser(userId) {
    this._userService.getUserByID(userId).subscribe(
      data => {
        this.handleUser(data);
        this.isLoading = false;
      }
    )
  }

  handleUser(data) {
    this.user = data;
    this.getAvatar(data.id);
    this.getCoverImage(data.id);
  }

  getCurrentUser(token) {
    this._userService.getUser(token).subscribe(
      data => this.handleCurrentUser(data)
    )
  }

  handleCurrentUser(data) {
    this.currentUser = data;
  }

  getAvatar(id) {
    this._imageService.getAvatar(id).subscribe(
      data => this.handleAvatar(data),
    )
  }

  handleAvatar(data) {
    if (data.image) {
      this.avatarUrl = 'http://localhost:8000/images/' + data.image;
    }
  }

  getCoverImage(id) {
    this._imageService.getCoverImage(id).subscribe(
      data => this.handleCoverImage(data),
    )
  }

  handleCoverImage(data) {
    if (data.image) {
      this.coverImageUrl = 'http://localhost:8000/images/' + data.image;
    }
  }

}
