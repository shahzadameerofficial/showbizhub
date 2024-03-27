import { Component, effect } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-movies-trending',
    standalone: true,
    templateUrl: './movies-trending.component.html',
    styleUrl: './movies-trending.component.scss',
    imports: [ CommonModule, CardsContainerComponent]
})
export class MoviesTrendingComponent {
  timeWindow:string = 'day';
  detectChange = effect(() => {
    this.timeWindow = this.tmdbService.timeWindow();
  })
  constructor(private tmdbService: TmdbService){
    this.timeWindow = tmdbService.timeWindow()
  }
  
}
