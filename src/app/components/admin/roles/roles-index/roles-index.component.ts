import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-roles-index',
  templateUrl: './roles-index.component.html',
  styleUrls: ['./roles-index.component.css']
})
export class RolesIndexComponent implements OnInit {
  public roles;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getRoles();
  }

  getRoles() {
    this._userService.getRoles().subscribe(
      data => this.handle(data)
    )
  }

  handle(data) {
    this.roles = data.roles;
    this.dtTrigger.next();
  }
}
