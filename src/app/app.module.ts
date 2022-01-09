import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MenuComponent } from './components/page-header/menu/menu.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LastestPostsViewComponent } from './components/lastest-posts-view/lastest-posts-view.component';
import { CategoryListElementComponent } from './components/lastest-posts-view/category-list-element/category-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    MenuComponent,
    HeroImageComponent,
    LastestPostsViewComponent,
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
