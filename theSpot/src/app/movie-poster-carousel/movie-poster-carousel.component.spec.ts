import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePosterCarouselComponent } from './movie-poster-carousel.component';

describe('MoviePosterCarouselComponent', () => {
  let component: MoviePosterCarouselComponent;
  let fixture: ComponentFixture<MoviePosterCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviePosterCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePosterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
