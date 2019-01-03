import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password = '';
  user;

  constructor(private authService: AuthServiceService, private router: Router ) {
    this.user = this.authService.afAuth.user;
   }

  ngOnInit() {
    this.user = this.authService.afAuth.user;
  }

  logIn() {
    this.authService.logIn(this.email, this.password)
    .then(
      () => {
        this.router.navigate(['/']);
      }
    )
    .catch((error) => {
      console.error(error.message);
    });
  }
}
