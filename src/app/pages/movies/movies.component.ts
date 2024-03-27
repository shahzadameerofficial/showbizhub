import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsContainerComponent } from "../../components/cards-container/cards-container.component";
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";


@Component({
    selector: 'app-movies',
    standalone: true,
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.scss',
    imports: [ DropdownModule, ReactiveFormsModule, CardsContainerComponent, TopTitlesComponent, FormsModule]
})
export class MoviesComponent {

  moviesTypes = [
    { name: 'Popular Movies', endpoint: 'popular', id: 1 },
    { name: 'Upcoming Movies', endpoint: 'upcoming', id: 2 },
    { name: 'Now Playing Movies', endpoint: 'now_playing', id: 3 },
    { name: 'Top Rated Movies', endpoint: 'top_rated', id: 4 }
  ];
  
  currentType: any = this.moviesTypes[0];
  
  constructor( private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(async(res: any) => {
       if (res.type) {
        let result = this.moviesTypes.filter(searchType => searchType.endpoint == res.type);
        this.currentType = result[0]
        
      } else {
        this.currentType = this.moviesTypes[0]
      }
    })
  }
  updateType(e:any){
    const qp = { type: e.value.endpoint }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: qp, queryParamsHandling: 'merge' })
  }
  
}
