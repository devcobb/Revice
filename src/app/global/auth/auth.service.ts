import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { DatabaseService } from '../database.service';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = "";
  uid = "";

  constructor(private auth: Auth, private dbService: DatabaseService) { }

  login({ email, password }: LoginData) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    localStorage.removeItem("user");
    return signOut(this.auth)
  }

  addUserData(nickname: string, profilePicture: string) {
    this.auth.onAuthStateChanged((user) => {
      this.dbService.addUserDataToDb(user!.uid, nickname, profilePicture)
    });
  }

  isAuthenticate(): boolean {
    let isAuth = false;
    this.auth.onAuthStateChanged(
      () => {
        if (this.auth.currentUser !== null) {
          isAuth = true
        }
        else {
          isAuth = false
        }
      }
    )

    return isAuth
  }

  get user() {
    return this.auth.currentUser
  }

  async userData() {
    let uid = JSON.parse(localStorage.getItem('user')!).uid;
    let username = await this.dbService.getUserName(uid).then(data => {
      this.username = data
    });

    return await { username: this.username, uid: uid }
  }
}
