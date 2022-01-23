import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewPostFormComponent } from './components/add-new-post/add-new-post-form/add-new-post-form.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { CategoryListElementComponent } from './components/add-new-post/category-list-element/category-list-element.component';
import { UploadImageComponent } from './components/add-new-post/upload-image/upload-image.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MenuComponent } from './components/page-header/menu/menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    MenuComponent,
    HeroImageComponent,
    AddNewPostComponent,
    CategoryListElementComponent,
    AddNewPostFormComponent,
    UploadImageComponent,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
