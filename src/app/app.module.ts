import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { CategoryListElementComponent } from './components/add-new-post/category-list-element/category-list-element.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { MenuComponent } from './components/page-header/menu/menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';


@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    MenuComponent,
    HeroImageComponent,
    AddNewPostComponent,
    CategoryListElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
