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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(isLogin: boolean): void {
    this.isLoginMode = isLogin;
    this.errorMessage = '';
    this.username = '';
    this.password = '';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.isLoginMode) {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      if (this.authService.register(this.username, this.password)) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Username already exists';
      }
    }
  }
}