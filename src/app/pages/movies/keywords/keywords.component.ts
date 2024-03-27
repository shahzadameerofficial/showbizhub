import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { MovieCardComponent } from "../../../components/cards/movie-card/movie-card.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
    selector: 'app-keywords',
    standalone: true,
    templateUrl: './keywords.component.html',
    styleUrl: './keywords.component.scss',
    imports: [MovieCardComponent, InfiniteScrollModule]
})
export class KeywordsComponent {
  
  movies: any[] = [];
  currentKeyword:any
  totalPages = 0
  constructor(private ac:ActivatedRoute, private tmdbService:TmdbService){
    this.ac.params.subscribe((res:any)=>{
      
      if (res.id) {
        this.currentId = res.id
        this.getMovies()
        this.getKeywordDetails()
      }
    })
  }
  

  currentId:number = 0
  pagenum = 1
  getMovies() {
    this.tmdbService.getTMDBData(`keyword/${this.currentId}/movies`, `&page=${this.pagenum}`).subscribe(
      (res: any) => {
        console.log(res);
        
        this.movies = res.results
        this.totalPages = res.total_pages
      }
    )
  }

  getKeywordDetails(){
    
    this.tmdbService.getTMDBData(`keyword/${this.currentId}`).subscribe(
      (res: any) => {
        this.currentKeyword = res
      }
    )
  }
  loadMoreMovies() {
    if (this.pagenum < this.totalPages) {
      this.pagenum++;
      this.tmdbService.getTMDBData(`keyword/${this.currentId}/movies`, `&page=${this.pagenum}`).subscribe(
        (res: any) => {
          res.results.forEach((element: any) => {
            this.movies.push(element)
          });
        }
      )
    }else{
    alert('No More Videos Found in this type')
    
    }

  }
}
