import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MenuComponent } from './components/page-header/menu/menu.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    MenuComponent,
    HeroImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
