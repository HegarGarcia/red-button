import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  authState: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(state => (this.authState = state));
  }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  anonymousLogin() {
    this.afAuth.auth.signInAnonymously();
  }
}
