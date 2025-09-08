import { Component } from '@angular/core';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(movieId: number): void {
    this.movieService.removeFromCart(movieId);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  getTax(): number {
    return Math.round(this.getSubtotal() * 0.15 * 100) / 100; // 15% tax
  }

  getTotal(): number {
    return Math.round((this.getSubtotal() + this.getTax()) * 100) / 100;
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}