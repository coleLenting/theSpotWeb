import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedGenre = '';

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });

    // Check for search query parameter
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.filterMovies();
      }
    });
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesSearch = !this.searchTerm || 
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesGenre = !this.selectedGenre || movie.genre === this.selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }

  viewMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  isInCart(movieId: number): boolean {
    return this.movieService.isInCart(movieId);
  }

  addToCart(movie: Movie): void {
    this.movieService.addToCart(movie);
  }

  removeFromCart(movieId: number): void {
    this.movieService.removeFromCart(movieId);
  }
}