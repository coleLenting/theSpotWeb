import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Dummy user data
  private users = [
    { username: 'admin', password: 'admin', isAdmin: true },
    { username: 'user', password: 'user', isAdmin: false }
  ];

  constructor() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      const userInfo: User = { username: user.username, isAdmin: user.isAdmin };
      this.currentUserSubject.next(userInfo);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    // Check if user already exists
    if (this.users.find(u => u.username === username)) {
      return false;
    }
    
    // Add new user
    this.users.push({ username, password, isAdmin: false });
    const userInfo: User = { username, isAdmin: false };
    this.currentUserSubject.next(userInfo);
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.isAdmin : false;
  }
}