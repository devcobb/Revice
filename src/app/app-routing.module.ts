import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LastestPostsViewComponent } from './components/lastest-posts-view/lastest-posts-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeroImageComponent },
  { path: 'latest', component: LastestPostsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
