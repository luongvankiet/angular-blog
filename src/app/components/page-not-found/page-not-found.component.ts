import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  back(event: MouseEvent){
    this.route.navigateByUrl('');
  }

  constructor(private route: Router) {  
  }

  ngOnInit() {
  }

}
