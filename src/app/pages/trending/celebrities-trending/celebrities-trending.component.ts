import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-celebrities-trending',
    standalone: true,
    templateUrl: './celebrities-trending.component.html',
    styleUrl: './celebrities-trending.component.scss',
    imports: [CommonModule, CardsContainerComponent]
})
export class CelebritiesTrendingComponent {
  timeWindow:string = 'day';
  detectChange = effect(() => {
    this.timeWindow = this.tmdbService.timeWindow();
  })
  constructor(private tmdbService: TmdbService){
    this.timeWindow = tmdbService.timeWindow()
  }
  
}
