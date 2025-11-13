import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {

  user = new User();
  erreur: boolean = false;

  ngOnInit() {}

  constructor(private authService: Auth, private router: Router) {}
  onLoggedin() {
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) this.router.navigate(['/']);
    else //alert('Login ou mot de passe incorrecte!');
      this.erreur = true;
  }
}
