import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';
import {map} from 'rxjs/operators';

export interface IPresent {
  whoFrom: string;
  date: string;
  present: string;
  whoTo: string;
  rating: number;
  checkbox: boolean;
  uid: string;
  userID: string;
  }

@Injectable({
  providedIn: 'root'
})
export class SessionsServiceService {
  sessionCollection: AngularFirestoreCollection<IPresent>;

  presents;

  constructor(public db: AngularFirestore, public authService: AuthServiceService) {
        this.sessionCollection = db.collection('presents', (ref) => {
      return ref.where('userID', '==', this.authService.user.uid);
    });
    this.presents = this.sessionCollection.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as IPresent;
          const id = a.payload.doc.id;
          return {
            id, ... data
          };
        }
      ))
    );
  }

  add(whoFromPassedIn, datePassedIn, presentPassedIn, whoToPassedIn, ratingPassedIn, checkboxPassedIn) {
    console.log(datePassedIn + ' is the date');
    const present: IPresent = {
      whoFrom: whoFromPassedIn,
      date: datePassedIn,
      present: presentPassedIn,
      whoTo: whoToPassedIn,
      rating: ratingPassedIn,
      checkbox: checkboxPassedIn,
      uid: this.authService.user.uid,
      userID: this.authService.user.uid
    };
    this.sessionCollection.add(present);
  }
  update(present) {
    return this.sessionCollection.doc(present.id).update({checkbox: true});
  }

  deleteItem(id) {
    return this.sessionCollection.doc(id).delete();
  }

  }

