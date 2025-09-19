import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'theSpot';
  cartCount = 0;
  wishlistCount = 0;

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
    
    this.movieService.watchlist$.subscribe(wishlist => {
      this.wishlistCount = wishlist.length;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}