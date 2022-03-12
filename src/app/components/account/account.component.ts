import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/global/auth/auth.service';
import { DatabaseService } from 'src/app/global/database.service';

interface userData {
  profilePic: string;
  email: string;
  uid: string;
  nickname: string;
  bannerImage: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  needLoading = true;
  user: User | null = null;
  updatedImage = "";
  userData: userData = { profilePic: "", email: "", uid: "", nickname: "", bannerImage: "" };

  constructor(private auth: AuthService, private router: Router, private db: DatabaseService) {
    if (!localStorage.getItem('userProfile')) {
      this.user = this.auth.user;
    }
    else {
      this.user = JSON.parse(localStorage.get('userProfile'));
    }

    this.setUserData()
  }

  ngOnInit(): void { }

  async setUserData() {
    if (typeof this.user?.email === 'string' && typeof this.user.uid === 'string') {
      this.userData.email = this.user?.email;
      this.userData.uid = this.user?.uid;

      const docRef = doc(this.db.firestore, "users", this.user?.uid);
      const docSnap = await getDoc(docRef);

      this.userData.nickname = await docSnap.data()?.nickname;
      this.userData.profilePic = await docSnap.data()?.profilePicture;
      this.userData.bannerImage = await docSnap.data()?.bannerImage;
      await setTimeout(() => this.needLoading = false, 750)
    }
  }

  get profilePicture() {
    return this.userData.profilePic
  }

  get bannerImage() {
    return this.userData.bannerImage
  }

  get email() {
    return this.userData.email
  }

  get uid() {
    return this.userData.uid
  }

  get nickname() {
    return this.userData.nickname
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home'])
  }

  isCurrentUser() {
    return !localStorage.getItem('userProfile') ? true : false
  }

  updateProfilePic() {
    let input = <HTMLInputElement>(document.querySelector(".profile-pic-input"));
    let label = <HTMLLabelElement>document.querySelector(`.profile-pic`);

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (label !== null && e.target !== null && typeof e.target.result === 'string') {
          this.updatedImage = e.target.result;
          this.db.updateProfilePic(this.userData.uid, e.target.result);
          this.userData.profilePic = e.target.result
        }
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
}
