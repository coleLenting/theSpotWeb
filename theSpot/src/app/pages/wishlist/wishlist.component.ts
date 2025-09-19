import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.watchlist$.subscribe(watchlist => {
      this.wishlistMovies = watchlist;
    });
  }

  addToCart(movie: Movie): void {
    this.movieService.addToCart(movie);
  }

  removeFromCart(movieId: number): void {
    this.movieService.removeFromCart(movieId);
  }

  removeFromWishlist(movieId: number): void {
    this.movieService.removeFromWatchlist(movieId);
  }

  isInCart(movieId: number): boolean {
    return this.movieService.isInCart(movieId);
  }
}