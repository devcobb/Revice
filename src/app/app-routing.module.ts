import { NgModule } from '@angular/core';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { LoginViewComponent } from './components/login-view/login-view.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HeroImageComponent },
  { path: 'new', component: AddNewPostComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'latest', component: LatestPostsComponent },
  { path: 'post/**', component: LatestPostsComponent },
  { path: 'user/**', component: LatestPostsComponent },
  {
    path: 'account', component: AccountComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
