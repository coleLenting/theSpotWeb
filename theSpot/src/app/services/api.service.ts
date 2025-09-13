import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Movie {
  _id?: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  poster: string;
  price: number;
  trailer?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Backend Item interface (matches the actual backend model)
export interface BackendItem {
  _id?: string;
  title: string;
  description: string;
  genre: string;
  dailyRate: number;
  inStock: boolean;
  releaseYear?: number;
  director?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Helper method to convert backend item to frontend movie
  private backendToFrontend(item: BackendItem): Movie {
    return {
      _id: item._id,
      title: item.title,
      year: item.releaseYear || new Date().getFullYear(),
      genre: item.genre,
      rating: 8.0, // Default rating since backend doesn't have this field
      description: item.description,
      poster: item.imageUrl || 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: item.dailyRate,
      trailer: '', // Backend doesn't have trailer field
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  }

  // Helper method to convert frontend movie to backend item
  private frontendToBackend(movie: Partial<Movie>): Partial<BackendItem> {
    return {
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      dailyRate: movie.price,
      releaseYear: movie.year,
      imageUrl: movie.poster,
      inStock: true
    };
  }

  // Movie endpoints
  getMovies(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<{items: BackendItem[], total: number, page: number, pages: number}>(`${this.baseUrl}/items?page=${page}&limit=${limit}`)
      .pipe(
        map(response => ({
          ...response,
          items: response.items.map(item => this.backendToFrontend(item))
        }))
      );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<BackendItem>(`${this.baseUrl}/items/${id}`)
      .pipe(
        map(item => this.backendToFrontend(item))
      );
  }

  createMovie(movie: Partial<Movie>): Observable<Movie> {
    const backendItem = this.frontendToBackend(movie);
    return this.http.post<BackendItem>(`${this.baseUrl}/items`, backendItem)
      .pipe(
        map(item => this.backendToFrontend(item))
      );
  }

  updateMovie(id: string, movie: Partial<Movie>): Observable<Movie> {
    const backendItem = this.frontendToBackend(movie);
    return this.http.put<BackendItem>(`${this.baseUrl}/items/${id}`, backendItem)
      .pipe(
        map(item => this.backendToFrontend(item))
      );
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`);
  }

  // User management endpoints
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  makeUserAdmin(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/make-admin`, {});
  }

  // Profile endpoints
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/me`);
  }

  updateProfile(data: { name?: string; currentPassword?: string; newPassword?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/me`, data);
  }
}