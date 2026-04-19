import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verif-email.html',
})
export class VerifEmail implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        this.toastr.success('Email validé avec succès !', 'Félicitations');
        // Auto login after verification
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err: any) => {
        if (err.status == 400 || err.status == 404) {
          if (err.error.errorCode == "INVALID_TOKEN") this.err = "Code invalide !";
          else if (err.error.errorCode == "EXPIRED_TOKEN") this.err = "Le code a expiré !";
          else this.err = err.error.message;
        }
        console.log(err);
      },
    });
  }
}
