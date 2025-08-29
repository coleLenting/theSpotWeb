import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredMovies: Movie[] = [];
  searchTerm = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.featuredMovies = this.movieService.getFeaturedMovies();
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/items'], { queryParams: { search: this.searchTerm } });
    }
  }

  viewMovie(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  addToCart(movie: Movie): void {
    this.movieService.addToCart(movie);
  }
}