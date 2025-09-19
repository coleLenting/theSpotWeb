import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private movieService: MovieService
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movie = this.movieService.getMovie(id) ?? null;
      this.loading = false;
    } else {
      this.router.navigate(['/items']);
    }
  }

  addToCart(): void {
    if (this.movie) {
      this.movieService.addToCart(this.movie);
    }
  }

  removeFromCart(): void {
    if (this.movie) {
      this.movieService.removeFromCart(this.movie.id);
    }
  }

  isInCart(): boolean {
    return this.movie ? this.movieService.isInCart(this.movie.id) : false;
  }

  addToWishlist(): void {
    if (this.movie) {
      this.movieService.addToWatchlist(this.movie);
    }
  }

  removeFromWishlist(): void {
    if (this.movie) {
      this.movieService.removeFromWatchlist(this.movie.id);
    }
  }

  isInWishlist(): boolean {
    return this.movie ? this.movieService.isInWishlist(this.movie.id) : false;
  }

  goBack(): void {
    this.location.back();
  }
}