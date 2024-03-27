import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-tvshows-trending',
    standalone: true,
    templateUrl: './tvshows-trending.component.html',
    styleUrl: './tvshows-trending.component.scss',
    imports: [CommonModule, CardsContainerComponent]
})
export class TvshowsTrendingComponent {

  timeWindow:string = 'day';
  detectChange = effect(() => {
    this.timeWindow = this.tmdbService.timeWindow();
  })
  constructor(private tmdbService: TmdbService){
    this.timeWindow = tmdbService.timeWindow()
  }
  
}
