import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, Movie as ApiMovie } from './api.service';
import { AuthService } from './auth.service';

export interface Movie {
  id: number;
  _id?: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  poster: string;
  price: number;
  trailer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  private cartSubject = new BehaviorSubject<Movie[]>([]);
  public cart$ = this.cartSubject.asObservable();

  private watchlistSubject = new BehaviorSubject<Movie[]>([]);
  public watchlist$ = this.watchlistSubject.asObservable();

  private useBackend = true; // Flag to switch between backend and dummy data

  refreshPage(): void {
    window.location.reload();
  }

  refreshData(): void {
    this.loadMoviesFromBackend(); 
  }
  
  // Dummy movie data
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Matrix',
      year: 1999,
      genre: 'Action',
      rating: 8.7,
      description: 'A computer programmer discovers that reality as he knows it is a simulation controlled by machines. He must choose between the blue pill and the red pill to uncover the truth about the Matrix.',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 45.99
    },
    {
      id: 2,
      title: 'Inception',
      year: 2010,
      genre: 'Thriller',
      rating: 8.8,
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      poster: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 52.99
    },
    {
      id: 3,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.6,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival when Earth becomes uninhabitable.',
      poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400',
      price: 58.99
    },
    {
      id: 4,
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      rating: 9.0,
      description: 'Batman faces the Joker in this epic superhero thriller. When the menace known as the Joker wreaks havoc on Gotham City, Batman must confront his greatest psychological and physical tests.',
      poster: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 49.99
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      year: 1994,
      genre: 'Crime',
      rating: 8.9,
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
      poster: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 39.99
    },
    {
      id: 6,
      title: 'Avatar',
      year: 2009,
      genre: 'Adventure',
      rating: 7.8,
      description: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
      poster: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 55.99
    },
    {
      id: 7,
      title: 'The Godfather',
      year: 1972,
      genre: 'Crime',
      rating: 9.2,
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      poster: 'https://images.pexels.com/photos/8263618/pexels-photo-8263618.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 42.99
    },
    {
      id: 8,
      title: 'Forrest Gump',
      year: 1994,
      genre: 'Drama',
      rating: 8.8,
      description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 44.99
    },
    {
      id: 9,
      title: 'The Shawshank Redemption',
      year: 1994,
      genre: 'Drama',
      rating: 9.3,
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      poster: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 41.99
    },
    {
      id: 10,
      title: 'Goodfellas',
      year: 1990,
      genre: 'Crime',
      rating: 8.7,
      description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
      poster: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 43.99
    },
    {
      id: 11,
      title: 'Fight Club',
      year: 1999,
      genre: 'Drama',
      rating: 8.8,
      description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.',
      poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400',
      price: 46.99
    },
    {
      id: 12,
      title: 'The Lord of the Rings',
      year: 2001,
      genre: 'Adventure',
      rating: 8.8,
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.',
      poster: 'https://images.pexels.com/photos/8263618/pexels-photo-8263618.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 59.99
    }
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {
    // Load movies from backend or use dummy data
    if (this.useBackend) {
      this.loadMoviesFromBackend();
    } else {
      this.moviesSubject.next(this.movies);
    }
    
    // Load user-specific cart and watchlist when user changes
    this.authService.user$.subscribe(user => {
      this.loadUserData(user);
    });
    
    // Load initial user data
    this.loadUserData(this.authService.getUser());
  }

  private loadUserData(user: any): void {
    if (user && user.id) {
      // Load user-specific cart and watchlist
      const userCartKey = `cart_${user.id}`;
      const userWatchlistKey = `watchlist_${user.id}`;
      
      const savedCart = localStorage.getItem(userCartKey);
      if (savedCart) {
        this.cartSubject.next(JSON.parse(savedCart));
      } else {
        this.cartSubject.next([]);
      }
      
      const savedWatchlist = localStorage.getItem(userWatchlistKey);
      if (savedWatchlist) {
        this.watchlistSubject.next(JSON.parse(savedWatchlist));
      } else {
        this.watchlistSubject.next([]);
      }
    } else {
      // Clear cart and watchlist when no user is logged in
      this.cartSubject.next([]);
      this.watchlistSubject.next([]);
    }
  }

  private saveUserCart(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      const userCartKey = `cart_${user.id}`;
      localStorage.setItem(userCartKey, JSON.stringify(this.cartSubject.value));
    }
  }

  private saveUserWatchlist(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      const userWatchlistKey = `watchlist_${user.id}`;
      localStorage.setItem(userWatchlistKey, JSON.stringify(this.watchlistSubject.value));
    }
  }

  private loadMoviesFromBackend(): void {
    this.apiService.getMovies(1, 50).subscribe({
      next: (response) => {
        // The API service already converts backend items to frontend movies
        const backendMovies = response.items.map((movie: any) => ({
          id: parseInt(movie._id?.slice(-6) || '0', 16), // Convert _id to number for compatibility
          _id: movie._id,
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          rating: movie.rating,
          description: movie.description,
          poster: movie.poster,
          price: movie.price,
          trailer: movie.trailer
        }));
        
        // If no movies in backend, use dummy data
        if (backendMovies.length === 0) {
          this.moviesSubject.next(this.movies);
        } else {
          this.moviesSubject.next(backendMovies);
        }
      },
      error: (error) => {
        console.warn('Failed to load movies from backend, using dummy data:', error);
        this.moviesSubject.next(this.movies);
      }
    });
  }

  public reloadMoviesFromBackend(): void {
    this.apiService.getMovies(1, 50).subscribe({
      next: (response) => {
        const backendMovies = response.items.map((movie: any) => ({
          id: parseInt(movie._id?.slice(-6) || '0', 16),
          _id: movie._id,
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          rating: movie.rating,
          description: movie.description,
          poster: movie.poster,
          price: movie.price,
          trailer: movie.trailer
        }));
        this.moviesSubject.next(backendMovies.length === 0 ? this.movies : backendMovies);
      },
      error: (error) => {
        this.moviesSubject.next(this.movies);
      }
    });
  }

  getMovies(): Movie[] {
    return this.moviesSubject.value;
  }

  getMovie(id: number): Movie | undefined {
    return this.moviesSubject.value.find(movie => movie.id === id);
  }

  // Method to refresh movies from backend
  refreshMovies(): void {
    if (this.useBackend) {
      this.loadMoviesFromBackend();
    }
  }

  getFeaturedMovies(): Movie[] {
    return this.moviesSubject.value.slice(0, 3);
  }

  addToCart(movie: Movie): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart.find(item => item.id === movie.id)) {
      const updatedCart = [...currentCart, movie];
      this.cartSubject.next(updatedCart);
      this.saveUserCart();
    }
  }

  removeFromCart(movieId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== movieId);
    this.cartSubject.next(updatedCart);
    this.saveUserCart();
    this.refreshData();
  }

  addToWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlistSubject.value;
    if (!currentWatchlist.find(item => item.id === movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      this.watchlistSubject.next(updatedWatchlist);
      this.saveUserWatchlist();
      this.refreshData();
    }
  }

  removeFromWatchlist(movieId: number): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.filter(item => item.id !== movieId);
    this.watchlistSubject.next(updatedWatchlist);
    this.saveUserWatchlist();
    this.refreshData();
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, movie) => total + movie.price, 0);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    const user = this.authService.getUser();
    if (user && user.id) {
      const userCartKey = `cart_${user.id}`;
      localStorage.removeItem(userCartKey);
    }
  }

  isInCart(movieId: number): boolean {
    return this.cartSubject.value.some(item => item.id === movieId);
  }

  isInWishlist(movieId: number): boolean {
    return this.watchlistSubject.value.some(item => item.id === movieId);
  }
}