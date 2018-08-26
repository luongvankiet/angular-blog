import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.css']
})
export class ProfileImagesComponent implements OnInit {
  @Input() user = [];
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
  }


}
