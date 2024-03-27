import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { TvshowCardComponent } from "../../../components/cards/tvshow-card/tvshow-card.component";
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-tvshow-search',
    standalone: true,
    templateUrl: './tvshow-search.component.html',
    styleUrl: './tvshow-search.component.scss',
    imports: [ TvshowCardComponent, CardsContainerComponent]
})
export class TvshowSearchComponent {


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
