import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  user = new User();
  err: number = 0;
  message: string = "Login ou mot de passe erronés..";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data: any) => {
        let jwToken = data.headers.get('Authorization')!;
        let cleanToken = jwToken.replace('Bearer ', '').trim();
        this.authService.saveToken(cleanToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error && err.error.errorCause == 'disabled') {
          this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur (ou vérifiez vos emails).";
        }
      },
    });
  }
}
