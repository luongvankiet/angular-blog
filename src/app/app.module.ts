import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule, TabsModule, ModalModule, PaginationModule, CollapseModule } from 'ngx-bootstrap';
import { AuthGuard } from './services/auth-guard.service';
import { JwtAuthService } from './services/jwt-auth.service';
import { AuthService } from './services/auth-service.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/posts/index/index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateComponent } from './components/posts/create/create.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { CategoriesIndexComponent } from './components/admin/categories/categories-index/categories-index.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { SearchService } from './services/search.service';
import { SearchComponent } from './components/search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RolesIndexComponent } from './components/admin/roles/roles-index/roles-index.component';
import { UsersIndexComponent } from './components/admin/users/users-index/users-index.component';
import { EditComponent } from './components/posts/edit/edit.component';
import { ProfilePostsComponent } from './components/profile/profile-posts/profile-posts.component';
import { ProfileImagesComponent } from './components/profile/profile-images/profile-images.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    PageNotFoundComponent,
    CarouselComponent,
    ResetpasswordComponent,
    HeaderComponent,
    IndexComponent,
    SidebarComponent,
    CategoriesComponent,
    HomeComponent,
    SinglePostComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    DashboardComponent,
    CategoriesIndexComponent,
    PostsComponent,
    SearchComponent,
    RolesIndexComponent,
    UsersIndexComponent,
    EditComponent,
    ProfilePostsComponent,
    ProfileImagesComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
    PreloaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SnotifyModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    CKEditorModule,
    DataTablesModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    CollapseModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthGuard,
    JwtAuthService,
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
