import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize user from localStorage
    const user = this.getUser();
    if (user) {
      this.userSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        this.setSession(res);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap((res: any) => {
        this.setSession(res);
      })
    );
  }

  private setSession(authResult: any): void {
    localStorage.setItem(this.tokenKey, authResult.token);
    localStorage.setItem(this.userKey, JSON.stringify(authResult.user));
    this.userSubject.next(authResult.user);
  }

  updateUserData(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }
}
