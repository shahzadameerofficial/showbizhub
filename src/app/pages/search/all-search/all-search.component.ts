import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";

@Component({
    selector: 'app-all-search',
    standalone: true,
    templateUrl: './all-search.component.html',
    styleUrl: './all-search.component.scss',
    imports: [CardsContainerComponent]
})
export class AllSearchComponent {
  currentQuery:string = ''
  constructor(private ac: ActivatedRoute, private tmdbService:TmdbService) {
    ac.params.subscribe(
      (res:any)=>{
        if (res.query) {
          this.currentQuery = res.query;
          this.tmdbService.setState({searchQuery: res.query})
        }
      }
    )
  }
}
