import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  isLoginMode = true;
  username = '';
  password = '';
  errorMessage = '';
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(isLogin: boolean): void {
    this.isLoginMode = isLogin;
    this.errorMessage = '';
    this.email = '';
    this.username = '';
    this.password = '';
  }

 onSubmit(): void {
  if (this.isLoginMode) {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userRole', res.user.role);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid login';
      }
    });

  } else {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userRole', res.user.role);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
}