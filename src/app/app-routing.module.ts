import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LoginViewComponent } from './components/login-view/login-view.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./global/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'home', component: HeroImageComponent },
  { path: 'new', component: AddNewPostComponent },
  { path: 'login', component: LoginViewComponent },
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
