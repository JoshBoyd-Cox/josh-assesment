import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';

export interface ISession {
  whoFrom: string;
  date: string;
  present: string;
  whoTo: string;
  rating: number;
  uid: string;
  }

@Injectable({
  providedIn: 'root'
})
export class SessionsServiceService {
  sessionCollection: AngularFirestoreCollection<ISession>;

  constructor(public db: AngularFirestore, public authService: AuthServiceService) {
    this.sessionCollection = db.collection('sessions', (ref) => {
      return ref.where('uid', '==', this.authService.user.uid);
    });
  }

  add(whoFromPassedIn, datePassedIn, presentPassedIn, whoToPassedIn, ratingPassedIn) {
    const session: ISession = {
      whoFrom: whoFromPassedIn,
      date: datePassedIn,
      present: presentPassedIn,
      whoTo: whoToPassedIn,
      rating: ratingPassedIn,
      uid: this.authService.user.uid
    };
    this.sessionCollection.add(session);
  }
  update() {
    console.log('reached update');
  }
  }

