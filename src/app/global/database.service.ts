import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { initializeApp } from 'firebase/app';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { environment } from 'src/environments/environment';
import { BannerField, Category, ImageField, Post, Star, TextField } from './global-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private database: Database,
    public firestore: Firestore
  ) { }

  app = initializeApp(environment.firebase);
  storage = getStorage(this.app);

  async addUserDataToDb(uid: string, nickname: string, profilePicture: string) {
    const docRef = await setDoc(doc(this.firestore, "users", uid), {
      uid: uid,
      nickname: nickname,
      profilePicture: profilePicture
    });
  }

  async updateProfilePic(uid: string, nickname: string, picture: string) {
    const storageRef = await ref(this.storage, `users/profile_pictures/${uid}-${nickname}-profile`);
    await uploadString(storageRef, picture, 'data_url').then((snapshot) => { });
  }

  async addPost(id: string, thumbnail: string, title: string, fields: (TextField | ImageField | BannerField)[], postPrivate: boolean, authorName: string, uid: string, ratings: Star[], category: Category) {
    const docRef = await setDoc(doc(this.firestore, "posts", id), {
      title: title,
      fields: fields,
      postPrivate: postPrivate,
      author: authorName,
      ratings: ratings,
      category: category.name,
      id: id,
      uid: uid
    });

    const storageRef = await ref(this.storage, `post_thumbails/${id}-${title}-thumnbail`);
    await uploadString(storageRef, thumbnail, 'data_url').then((snapshot) => { });
  }

  async getThumbnail(dbUrl: string) {
    let thumbnail = "";

    await getDownloadURL(ref(this.storage, dbUrl))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        thumbnail = url

      })
      .catch((error) => {
        console.log(error)
      });

    return await thumbnail;
  }

  async getPosts() {
    const publicPostsQuery = await query(collection(this.firestore, "posts"), where("postPrivate", "==", false), orderBy("id"));
    const posts = await getDocs(publicPostsQuery);
    let localPosts: Post[] = [];

    await posts.forEach((doc) => {
      localPosts.push(doc.data() as Post)
    });

    return await localPosts;
  }

  async getUserName(id: string) {
    const userNameQuery = await query(collection(this.firestore, "users"), where("uid", "==", id));
    const querySnapshot = await getDocs(userNameQuery);
    let username = "";

    await querySnapshot.forEach((doc) => {
      username = doc.data().nickname;
    });

    return username;
  }

  async checkForUsersPosts(uid: string) {
    let postsQuery = null;
    let user = await JSON.parse(localStorage.getItem('user')!);

    if (user && user.uid === uid) {
      postsQuery = await query(collection(this.firestore, "posts"), where("uid", "==", uid), orderBy("id"), limit(3));
    }
    else {
      postsQuery = await query(collection(this.firestore, "posts"), where("uid", "==", uid), where("postPrivate", "==", false), orderBy("id"), limit(3));
    }

    const querySnapshot = await getDocs(postsQuery);
    let posts: Post[] = [];

    await querySnapshot.forEach((doc) => {
      posts.push(doc.data() as Post);
    });

    return posts;
  }

  postId() {
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    let lastPushTime = 0;
    let lastRandChars: number[] = [];

    return (function () {
      let now = new Date().getTime();
      let duplicateTime = (now === lastPushTime);
      lastPushTime = now;

      let timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');

      let id = timeStampChars.join('');

      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if (id.length != 20) throw new Error('Length should be 20.');

      return id
    })();

  }
}
