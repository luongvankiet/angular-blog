import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { IndexComponent } from './components/posts/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateComponent } from './components/posts/create/create.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CategoriesIndexComponent } from './components/admin/categories/categories-index/categories-index.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { SearchComponent } from './components/search/search.component';
import { RolesIndexComponent } from './components/admin/roles/roles-index/roles-index.component';
import { UsersIndexComponent } from './components/admin/users/users-index/users-index.component';
import { AdminGuardService } from './services/admin-guard.service';
import { EditComponent } from './components/posts/edit/edit.component';
import { ProfilePostsComponent } from './components/profile/profile-posts/profile-posts.component';
import { ProfileImagesComponent } from './components/profile/profile-images/profile-images.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'posts/create', component: CreateComponent },
      { path: 'posts/:slug', component: SinglePostComponent },
      { path: 'posts/:slug/edit', component: EditComponent },
      { path: 'categories/:slug', component: CategoriesComponent },
      { path: 'search/:term', component: SearchComponent },
      {
        path: 'profile/:id', component: ProfileComponent,
      },
    ]
  },
  {
    path: 'admin', component: DashboardComponent, canActivate: [AdminGuardService],
    children: [
      { path: '', component: PostsComponent },
      { path: 'categories', component: CategoriesIndexComponent },
      { path: 'users', component: UsersIndexComponent },
      { path: 'roles', component: RolesIndexComponent },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'preloader', component: PreloaderComponent },
  { path: 'signup', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetpasswordComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],



  declarations: []
})

export class AppRoutingModule { }
