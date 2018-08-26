import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.css']
})
export class CategoriesIndexComponent implements OnInit {
  modalRef: BsModalRef;
  category_detail: BsModalRef;
  dtOptions: any = {};
  public categories = [];
  dtTrigger: Subject<any> = new Subject();
  public form = {
    category_name: null
  }
  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private modalService: BsModalService,
    private _notify: SnotifyService,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
    };
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.handleCategoriesData(data);
      },
    )
  }

  handleCategoriesData(data) {
    this.categories = data.data;
    this.dtTrigger.next();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
    );
  }

  onSubmit() {
    this._categoryService.createCategory(this.form).subscribe(
      data => {
        this.handleCreate(data)
      }
    );
  }

  handleCreate(data) {
    this.categories.push(data.data);
    this._notify.success('New category has been successfully created', 'Success!', {
      timeout: 5000, closeOnClick: true,
    });
    this.modalRef.hide();
  }

  openModal2(template2: TemplateRef<any>) {
    this.category_detail = this.modalService.show(
      template2,
    );
  }

  onEdit(category) {
    this._categoryService.updateCategory(category).subscribe(
      data => {
        category = data;
        this._notify.success('Successfully updated', 'Success');
        this.category_detail.hide();
        console.log(category);

      },
      error => this._notify.error('Something went wrong', 'Error'),
    )
  }

  onDelete(category){
    this._notify.confirm(`Delete ${category.category_name}`,'Delete', {
      buttons: [
        {text: 'Yes', action: (toast) => {this.deleteCategory(category.id); this._notify.remove(toast.id); }},
        {text: 'No', action: (toast) => {this._notify.remove(toast.id); }},
      ]
    })
  }

  deleteCategory(id){
    this._categoryService.deleteCategory(id).subscribe(
      data => { this.handleDelete(data) }
    )
  }

  handleDelete(data){
    this._notify.success(data.message, 'Success');
    this.category_detail.hide();
  }
}
