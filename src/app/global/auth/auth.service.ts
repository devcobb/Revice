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
  constructor(private auth: Auth, private dbService: DatabaseService) { }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  addUserData(nickname: string) {
    this.auth.onAuthStateChanged((user) => {
      this.dbService.addUserDataToDb(user!.uid, nickname)
    });
  }
}
