import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import {SessionsServiceService} from '../services/sessions-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  sessions: Observable<any[]>;
  whoFrom: string;
  date: string;
  present: string;
  whoTo: string;
  rating: number;

  constructor(db: AngularFirestore, public authService: AuthServiceService, public router: Router,
    public sessionsService: SessionsServiceService) {
    this.sessions = this.sessionsService.sessionCollection.valueChanges();
    // this.sessions = db.collection('sessions').valueChanges(); //This needs to come from the lessons service.
    this.user = this.authService.user;
  }

  ngOnInit() {
  }

  logOut() {
    console.log(this.authService.user.uid);
    this.authService.logOut()
    .then(
      () => {
      this.router.navigate(['/login']);
    }
    )
    .catch((error) => {
      console.error(error.message);
    });
  }

  createNewLesson() {
    this.sessionsService.add(this.whoFrom, this.date, this.present, this.whoTo, this.rating);
    this.whoFrom = '';
    this.date = '';
    this.present = '';
    this.whoTo = '';
    this.rating = -1;
  }

  update() {
    this.sessionsService.update();
  }
}


// come back to this section
