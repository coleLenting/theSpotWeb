import { Component, OnInit } from '@angular/core';
import { ApiService, Movie } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'movies';
  movies: Movie[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

    get maxYear(): number {
    return new Date().getFullYear() + 5;
  }
  
  // Movie form
  movieForm: Partial<Movie> = {
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 0,
    description: '',
    poster: '',
    price: 0,
    trailer: ''
  };
  
  editingMovie: Movie | null = null;
  showMovieForm = false;
  
  // User management
  users: any[] = [];
  userIdToPromote = '';
  
  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalMovies = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private movieService: MovieService // <-- Inject MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Tab management
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.clearMessages();
    
    if (tab === 'users') {
      this.loadUsers();
    }
  }

  // User management
  loadUsers(): void {
    this.isLoading = true;
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  // Movie management
  loadMovies(): void {
    this.isLoading = true;
    this.apiService.getMovies(this.currentPage, 10).subscribe({
      next: (response) => {
        this.movies = response.items;
        this.totalPages = response.pages;
        this.totalMovies = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load movies';
        this.isLoading = false;
      }
    });
  }

  showAddMovieForm(): void {
    this.editingMovie = null;
    this.movieForm = {
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      rating: 0,
      description: '',
      poster: '',
      price: 0,
      trailer: ''
    };
    this.showMovieForm = true;
    this.clearMessages();
  }

  refreshPage(): void {
  window.location.reload();
}

refreshData(): void {
  if (this.activeTab === 'movies') {
    this.loadMovies();
  } else if (this.activeTab === 'users') {
    this.loadUsers();
  }
}

  editMovie(movie: Movie): void {
    this.editingMovie = movie;
    this.movieForm = { ...movie };
    this.showMovieForm = true;
    this.clearMessages();
  }

  saveMovie(): void {
    if (!this.validateMovieForm()) return;
    this.isLoading = true;
    if (this.editingMovie) {
      this.apiService.updateMovie(this.editingMovie._id!, this.movieForm).subscribe({
        next: (response) => {
          this.successMessage = 'Movie updated successfully!';
          this.showMovieForm = false;
          this.movieService.refreshMovies(); 
          this.loadMovies(); 
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update movie';
          this.isLoading = false;
        }
      });
    } else {
      this.apiService.createMovie(this.movieForm).subscribe({
        next: (response) => {
          this.successMessage = 'Movie created successfully!';
          this.showMovieForm = false;
          this.movieService.refreshMovies(); 
          this.loadMovies(); 
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to create movie';
          this.isLoading = false;
        }
      });
    }
  }

  deleteMovie(movie: Movie): void {
    if (!confirm(`Are you sure you want to delete "${movie.title}"?`)) return;
    this.isLoading = true;
    this.apiService.deleteMovie(movie._id!).subscribe({
      next: (response) => {
        this.successMessage = 'Movie deleted successfully!';
        this.movieService.refreshMovies(); 
        this.loadMovies(); 
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete movie';
        this.isLoading = false;
      }
    });
  }

  validateMovieForm(): boolean {
    if (!this.movieForm.title?.trim()) {
      this.errorMessage = 'Title is required';
      return false;
    }
    if (!this.movieForm.genre?.trim()) {
      this.errorMessage = 'Genre is required';
      return false;
    }
    if (!this.movieForm.description?.trim()) {
      this.errorMessage = 'Description is required';
      return false;
    }
    if (!this.movieForm.poster?.trim()) {
      this.errorMessage = 'Poster URL is required';
      return false;
    }
    if (this.movieForm.year! < 1900 || this.movieForm.year! > new Date().getFullYear() + 5) {
      this.errorMessage = 'Please enter a valid year';
      return false;
    }
    if (this.movieForm.rating! < 0 || this.movieForm.rating! > 10) {
      this.errorMessage = 'Rating must be between 0 and 10';
      return false;
    }
    if (this.movieForm.price! < 0) {
      this.errorMessage = 'Price must be positive';
      return false;
    }
    return true;
  }

  cancelMovieForm(): void {
    this.showMovieForm = false;
    this.editingMovie = null;
    this.clearMessages();
  }

  promoteUser(): void {
    if (!this.userIdToPromote.trim()) {
      this.errorMessage = 'Please enter a user ID';
      return;
    }
    
    this.isLoading = true;
    this.apiService.makeUserAdmin(this.userIdToPromote).subscribe({
      next: (response) => {
        this.successMessage = `User promoted to admin successfully!`;
        this.userIdToPromote = '';
        this.loadUsers(); // Refresh the users list
        this.refreshData();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to promote user';
        this.isLoading = false;
      }
    });
  }

  // Pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }

  // Utility
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  getGenres(): string[] {
    return ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  }
}
