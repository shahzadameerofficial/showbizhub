import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-celebrities-search',
    standalone: true,
    templateUrl: './celebrities-search.component.html',
    styleUrl: './celebrities-search.component.scss',
    imports: [CardsContainerComponent]
})
export class CelebritiesSearchComponent {

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
