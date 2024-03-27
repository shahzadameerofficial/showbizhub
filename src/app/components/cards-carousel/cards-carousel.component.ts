import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MovieCardComponent } from "../cards/movie-card/movie-card.component";
import { ButtonModule } from 'primeng/button';
import { CelebrityCardComponent } from "../cards/celebrity-card/celebrity-card.component";
import { RouterModule } from '@angular/router';
import { Celebrities } from '../../interface/celebrities.interface';
import { Movies } from '../../interface/movies.interface';
import { TopTitlesComponent } from "../top-titles/top-titles.component";

@Component({
    selector: 'app-cards-carousel',
    standalone: true,
    templateUrl: './cards-carousel.component.html',
    styleUrl: './cards-carousel.component.scss',
    imports: [CarouselModule, MovieCardComponent, ButtonModule, CelebrityCardComponent, RouterModule, TopTitlesComponent]
})
export class CardsCarouselComponent {
  @Input() movies: Movies | any;
  @Input() tvshows: any[] | undefined;
  @Input() celebs: Celebrities | any;
  @Input() headerText: string = '';

  responsiveOptions: any[] | undefined;
  
  ngOnInit() {
    
    this.responsiveOptions = [
      {
        breakpoint: '1079px',
        numVisible: 7,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '863px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 3,
        numScroll: 1
      }
    ];
  }
}
