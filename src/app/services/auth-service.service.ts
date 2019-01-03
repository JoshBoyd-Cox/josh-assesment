import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) { }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  registerUser(email: string, password: string) {
    console.log('variables passed in are ' + email + ' ' + password);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }
}
