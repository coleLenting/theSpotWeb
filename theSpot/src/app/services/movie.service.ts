import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Movie {
  id: number;
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

  // Dummy movie data
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Matrix',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 8.7,
      description: 'A computer programmer discovers that reality as he knows it is a simulation.',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 4.99
    },
    {
      id: 2,
      title: 'Inception',
      year: 2010,
      genre: 'Thriller',
      rating: 8.8,
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      poster: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 5.99
    },
    {
      id: 3,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.6,
      description: 'A team of explorers travel through a wormhole in space.',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 6.99
    },
    {
      id: 4,
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      rating: 9.0,
      description: 'Batman faces the Joker in this epic superhero thriller.',
      poster: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 4.99
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      year: 1994,
      genre: 'Crime',
      rating: 8.9,
      description: 'The lives of two mob hitmen, a boxer, and others intertwine.',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 3.99
    },
    {
      id: 6,
      title: 'Avatar',
      year: 2009,
      genre: 'Adventure',
      rating: 7.8,
      description: 'A paraplegic marine dispatched to the moon Pandora.',
      poster: 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 5.99
    }
  ];

  constructor() {
    this.moviesSubject.next(this.movies);
    
    // Load cart and watchlist from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
    
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      this.watchlistSubject.next(JSON.parse(savedWatchlist));
    }
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  getFeaturedMovies(): Movie[] {
    return this.movies.slice(0, 3);
  }

  addToCart(movie: Movie): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart.find(item => item.id === movie.id)) {
      const updatedCart = [...currentCart, movie];
      this.cartSubject.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  removeFromCart(movieId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== movieId);
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  addToWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlistSubject.value;
    if (!currentWatchlist.find(item => item.id === movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      this.watchlistSubject.next(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    }
  }

  removeFromWatchlist(movieId: number): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.filter(item => item.id !== movieId);
    this.watchlistSubject.next(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, movie) => total + movie.price, 0);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }
}