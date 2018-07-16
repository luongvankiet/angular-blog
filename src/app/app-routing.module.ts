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

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: IndexComponent},
      { path: 'posts/:id', component: SinglePostComponent},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'reset-password', component: ResetpasswordComponent },
      { path: 'categories/:slug/:id', component: CategoriesComponent }
    ]
  },
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
