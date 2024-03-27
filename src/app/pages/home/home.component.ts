import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Store } from '@ngrx/store';
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { CardsCarouselComponent } from "../../components/cards-carousel/cards-carousel.component";
import { Movies } from '../../interface/movies.interface';
import { Celebrities } from '../../interface/celebrities.interface';
import { CardsContainerComponent } from "../../components/cards-container/cards-container.component";
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroSectionComponent, CardsCarouselComponent, CardsContainerComponent, TopTitlesComponent]
})
export class HomeComponent {

  upcomingMovies: Movies = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  };
  heroSectionMovies: Movies = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  };
  celebrities: Celebrities | undefined
  constructor(private tmdbService: TmdbService, private store: Store) {
    this.getUpcomingMovies()
    this.getHeroSectionMovies()
    this.getPopularCelebs()
   }
  getUpcomingMovies() {
    this.tmdbService.getTMDBData('movie/upcoming').subscribe(
      (response: Movies) => {
        this.upcomingMovies = response
      }
    )
  };
  getHeroSectionMovies() {
    const types = ['popular','upcoming','top_rated','now_playing'];
    const index = Math.floor(Math.random() * types.length)
    this.tmdbService.getTMDBData(`movie/${types[index]}`).subscribe(
      (response: Movies) => {
        this.heroSectionMovies = response
        this.heroSectionMovies.results = response.results.filter(movie => movie.backdrop_path !== null && movie.backdrop_path !== undefined);
      }
    )
  };
  getPopularCelebs() {
    this.tmdbService.getTMDBData('person/popular').subscribe(
      (celebrities: Celebrities) => {
        this.celebrities = celebrities
      }
    )
  }
}
