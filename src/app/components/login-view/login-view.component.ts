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
  errorMessage = "";

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['account']);
    }
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => {
        localStorage.setItem("isLoggedIn", "true");
        this.router.navigate(['/account'])
      })
      .catch((error) => console.log(error.message));
  }

  register(registerData: LoginData) {
    this.authService
      .register(registerData)
      .then(() => {
        let nickname = (document.querySelector(".nickname-input") as HTMLInputElement).value
        let profilePicture = (document.querySelector(".nickname-input") as HTMLInputElement).value[0].toUpperCase();

        localStorage.setItem("isLoggedIn", "true");
        this.authService.addUserData(nickname, profilePicture)
      })
      .then(() => this.router.navigate(['/account']))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = "Email is already in use. Please sign in to your account.";
        }

        console.log(error.message)
      });
  }

  changeTab(tab: boolean) {
    this.errorMessage = "";

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

  showErrorMessage() {
    return this.errorMessage
  }
}
