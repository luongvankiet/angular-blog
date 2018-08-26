import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../../services/transfer-data.service';
import { CategoryService } from '../../services/category.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public posts;
  public isLoading = true;
  public searchTerm;
  constructor(
    private _transferData: TransferDataService,
    private _categoryService: CategoryService,
    private _searchService: SearchService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      param => {
        this.searchTerm = param.term;
      }
    )
    
    this._searchService.searchEntries(this.searchTerm)
    .subscribe(results => {
      this.handle(results);
    });
  }

  handle(data) {
    this.posts = data;
    this.isLoading = false;
  }

}
