import { Component, effect } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-all-trending',
    standalone: true,
    templateUrl: './all-trending.component.html',
    styleUrl: './all-trending.component.scss',
    imports: [ CommonModule, CardsContainerComponent]
})
export class AllTrendingComponent {
  timeWindow:string = 'day';
  detectChange = effect(() => {
    this.timeWindow = this.tmdbService.timeWindow();
  })
  constructor(private tmdbService:TmdbService){
    this.timeWindow = tmdbService.timeWindow()
  }

  
}

