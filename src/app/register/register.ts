import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: string = "";
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        this.toastr.success('Veuillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);
        this.loading = false;
      },
      error: (err: any) => {
        if (err.status == 400) {
          this.err = err.error.message;
        }
        this.loading = false;
      }
    });
  }
}
