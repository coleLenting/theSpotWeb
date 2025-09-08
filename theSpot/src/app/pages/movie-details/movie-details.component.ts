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
    this.movie = this.movieService.getMovie(id) ?? null; // Convert undefined to null
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

  goBack(): void {
    this.location.back();
  }
}