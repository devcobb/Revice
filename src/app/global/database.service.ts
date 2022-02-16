import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { addDoc, collection, Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private database: Database,
    public firestore: Firestore) { }


  async addUserDataToDb(uid: string, nickname: string) {
    const docRef = await addDoc(collection(this.firestore, "users"), {
      uid: uid,
      nickname: nickname,
    });
  }
}
