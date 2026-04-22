import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('AI Wrapper Management System');

  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }
}
