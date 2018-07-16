import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule, TabsModule, ModalModule } from 'ngx-bootstrap';
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
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SnotifyModule
    
  ],
  providers: [
    AuthGuard,
    JwtAuthService,
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
