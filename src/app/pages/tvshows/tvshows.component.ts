import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { TvshowCardComponent } from "../../components/cards/tvshow-card/tvshow-card.component";
import { CardsContainerComponent } from "../../components/cards-container/cards-container.component";
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";
import { DropdownModule } from 'primeng/dropdown';
import { MediaTypes } from '../../interface/common.interface';

@Component({
    selector: 'app-tvshows',
    standalone: true,
    templateUrl: './tvshows.component.html',
    styleUrl: './tvshows.component.scss',
    imports: [TvshowCardComponent, CardsContainerComponent, TopTitlesComponent, DropdownModule, FormsModule]
})
export class TvshowsComponent {
  
  tvShowsTypes = [
    { name: 'Popular TV Shows', endpoint: 'popular', id: 1 },
    { name: 'Airing Today TV Shows', endpoint: 'airing_today', id: 2 },
    { name: 'On The Air TV Shows', endpoint: 'on_the_air', id: 3 },
    { name: 'Top Rated TV Shows', endpoint: 'top_rated', id: 4 },

  ];
  
  currentType: MediaTypes = this.tvShowsTypes[0];
  
  constructor(private tmdbService: TmdbService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((res: any) => {
       if (res.type) {
        let result = this.tvShowsTypes.filter(searchType => searchType.endpoint == res.type);
        this.currentType = result[0]
        
      }
    })
  }
  updateType(e:any){
    
    const qp = { type: e.value.endpoint }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: qp, queryParamsHandling: 'merge' })
  }

}
