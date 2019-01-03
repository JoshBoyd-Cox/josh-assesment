import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  user;
  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.email, this.password)
      .then(
        () => {
          this.router.navigate(['/']);
        }
      )
      .catch((error) => {
        console.error(error.message);
      });
    this.user = this.authService.user;
    }

}

 // not working - come back to this
