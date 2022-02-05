import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginData } from 'src/app/global/auth/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  loginTab = true;
  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/account']))
      .catch((error) => console.log(error.message));
  }

  register(registerData: LoginData) {
    this.authService
      .register(registerData)
      .then(() => this.router.navigate(['/account']))
      .catch((error) => console.log(error.message));
  }

  changeTab() {
    this.loginTab = !this.loginTab;
  }
}
