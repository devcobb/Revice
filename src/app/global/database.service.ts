import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { doc, Firestore, setDoc, updateDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private database: Database,
    public firestore: Firestore) { }


  async addUserDataToDb(uid: string, nickname: string, profilePicture: string) {
    const docRef = await setDoc(doc(this.firestore, "users", uid), {
      uid: uid,
      nickname: nickname,
      profilePicture: profilePicture
    });
  }

  async updateProfilePic(uid: string, picture: string) {
    const docRef = await updateDoc(doc(this.firestore, "users", uid), {
      profilePicture: picture
    });
  }
}
