import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { PostService } from '../../services/post.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: false, showIndicators: true } }
  ]
})
export class CarouselComponent implements OnInit {
  public popularPosts;
  public newPosts;
  public newPostsImage;
  public isLoading = true;
  public isCarouselLoading = true;
  constructor(private _postService: PostService) { }

  ngOnInit() {
    this.getPopularPosts();
    this.getNewPosts();
    // this.posts = this._postService.getAllPosts();
  }
  getPopularPosts() {
    this._postService.getPopularPosts().subscribe(
      data => { 
        this.handlePostsData(data);
        this.isCarouselLoading = false;
      },
    )
  }

  getNewPosts() {
    this._postService.getNewPosts().subscribe(
      data => {
        this.handleNewPostsData(data);
        this.isLoading = false;
      },
    )
  }

  handlePostsData(data) {
    this.popularPosts = data.data;
  }

  handleNewPostsData(data) {
    this.newPosts = data.data;
  }
}
