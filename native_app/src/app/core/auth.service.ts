import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
