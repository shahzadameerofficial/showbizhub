import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { MovieCardComponent } from "../../../components/cards/movie-card/movie-card.component";
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-movies-search',
    standalone: true,
    templateUrl: './movies-search.component.html',
    styleUrl: './movies-search.component.scss',
    imports: [MovieCardComponent, CardsContainerComponent]
})
export class MoviesSearchComponent {

  currentQuery:string = ''
  constructor(private ac: ActivatedRoute, private tmdbService:TmdbService) {
    ac.params.subscribe(
      (res:any)=>{
        if (res.query) {
          this.currentQuery = res.query;
        }
      }
    )
  }

}
