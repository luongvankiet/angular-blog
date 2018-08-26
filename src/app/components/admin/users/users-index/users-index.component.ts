import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { ImageService } from '../../../../services/image.service';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { RoutingStateService } from '../../../../services/routing-state.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {
  bsValue = new Date();
  modalRef: BsModalRef;
  public users = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  private _returnUrl;
  constructor(
    private _userService: UserService,
    private _imageService: ImageService,
    private modalService: BsModalService,
    private _notify: SnotifyService,
    private _router: Router,
    private _routingState: RoutingStateService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    this._returnUrl = this._routingState.getCurrentRoute();
  }

  getUsers() {
    this._userService.getAllUsers().subscribe(
      data => this.handle(data)
    )
  }

  handle(data) {
    this.users = data.data;
    this.dtTrigger.next();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(user) {
    this._userService.updateUser(user).subscribe(
      data => this._notify.success('Successfully updated!','Success'),
      error => this._notify.error('Something went wrong!!','Error')
    )
    this.modalRef.hide();
  }

  onDelete(user){
    this._notify.confirm(`Delete ${user.name}`,'Delete', {
      buttons: [
        {text: 'Yes', action: (toast) => {this.deleteUser(user.id); this._notify.remove(toast.id); }},
        {text: 'No', action: (toast) => {this._notify.remove(toast.id); }},
      ]
    })
  }

  deleteUser(user){
    this._userService.deleteUser(user).subscribe(
      data => { this.handleDelete(data) }
    )
  }

  handleDelete(data){
    this._notify.success(data.message, 'Success');
    this.modalRef.hide();
    this._router.navigate([this._returnUrl])
  }
}
