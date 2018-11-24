import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/auth';

@Injectable()
export class AuthService {
  authState: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(state => (this.authState = state));
  }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  anonymousLogin() {
    this.afAuth.auth.signInAnonymously();
  }
}
