import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/global/auth/auth.service';

interface userData {
  profilePic: string;
  email: string;
  uid: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  userData: userData = { profilePic: "", email: "", uid: "" };

  constructor(private auth: AuthService, private router: Router) {
    if (!localStorage.getItem('userProfile')) {
      this.user = this.auth.user
    }
    else {
      this.user = JSON.parse(localStorage.get('userProfile'));
    }

    this.setUserData()
  }

  ngOnInit(): void { }

  setUserData() {
    if (typeof this.user?.email === 'string' && typeof this.user.uid === 'string') {
      this.userData.profilePic = this.user?.email[0].toUpperCase();
      this.userData.email = this.user?.email;
      this.userData.uid = this.user?.uid;
    }
  }

  get profilePicture() {
    return this.userData.profilePic
  }

  get email() {
    return this.userData.email
  }

  get uid() {
    return this.userData.uid
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home'])
  }

  isCurrentUser() {
    return !localStorage.getItem('userProfile') ? true : false
  }
}
