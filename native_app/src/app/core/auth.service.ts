import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  authState: firebase.User;

  constructor(private fireAuth: AngularFireAuth) {
    fireAuth.authState.subscribe(auth => (this.authState = auth));
  }

  anonymousLogin() {
    return this.fireAuth.auth
      .signInAnonymously()
      .then(() => console.log('Logged'));
  }
}
