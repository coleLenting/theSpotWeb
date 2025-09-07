import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
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
    this.movies = this.movieService.getMovies();
    this.filteredMovies = [...this.movies];
    
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
      const matchesSearch = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenre = !this.selectedGenre || movie.genre === this.selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }

  viewMovieDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  addToCart(movie: Movie): void {
    this.movieService.addToCart(movie);
  }
}
    }
  }

  viewMovie(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  addToCart(movie: Movie): void {
    this.movieService.addToCart(movie);
  }
}

