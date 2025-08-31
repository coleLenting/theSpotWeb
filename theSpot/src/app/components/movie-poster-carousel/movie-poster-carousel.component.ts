import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-movie-poster-carousel',
  standalone: false,
  templateUrl: './movie-poster-carousel.component.html',
  styleUrls: ['./movie-poster-carousel.component.css']
})
export class MoviePosterCarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private intervalId: any;

  movies = [
    {
      title: 'Blade Runner 2049',
      poster: 'https://image.tmdb.org/t/p/w780/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'
    },
    {
      title: 'Dune',
      poster: 'https://image.tmdb.org/t/p/w780/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'
    },
    {
      title: 'The Matrix',
      poster: 'https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
    },
    {
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.movies.length;
    }, 4000);
  }
}
