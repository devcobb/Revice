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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

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
      .then(() => {
        let nickname = (document.querySelector(".nickname-input") as HTMLInputElement).value
        let profilePicture = (document.querySelector(".nickname-input") as HTMLInputElement).value[0].toUpperCase()
        this.authService.addUserData(nickname, profilePicture)
      })
      .then(() => this.router.navigate(['/account']))
      .catch((error) => console.log(error.message));
  }

  changeTab(tab: boolean) {
    if (tab !== this.loginTab) {
      let active = document.querySelector(".active");
      let inactive = document.querySelector(".inactive");

      if (active !== null && inactive !== null) {
        active.className = active.className.replace('active', 'inactive');
        inactive.className = inactive.className.replace('inactive', 'active')
      }

      this.loginTab = tab;
    }
  }
}
