import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbService } from '../../../services/tmdb.service';
import { ImageModule } from 'primeng/image';
import { FirestoreService } from '../../../services/firestore.service';
import { Movie } from '../../../interface/movies.interface';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RatingPipe } from "../../../pipes/rating.pipe";
import { NgOptimizedImage } from '@angular/common'
import { ImgComponent } from "../../common/img/img.component";
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-movie-card',
    standalone: true,
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss',
    imports: [RouterModule, CommonModule, LazyLoadImageModule, ImageModule, RatingModule, FormsModule, RatingPipe, NgOptimizedImage, ImgComponent]
})
export class MovieCardComponent {
  @Input() movie:Movie | undefined;
  @Output() onFavorite = new EventEmitter;


  posterUrl:any = 'http://image.tmdb.org/t/p/w342';
  placeholder:string = '../../../../assets/images/defualt_poster.png'
  constructor(private tmdbService:TmdbService, private firestoreService:FirestoreService, private authService:AuthService) {
    this.setupUrl()
  }

  async setupUrl(){

    let config = await this.tmdbService.getSavingMode();
    
    // this.posterUrl = config.baseUrl+config.poster_size
  }
  addToFavourites(){
    if (this.movie) {
      
      if(this.authService.loggedInUser().demoAccount == true){
        this.onFavorite.emit({severity:'error',summary:'Unauthorized', detail:`Please Login to Perform this Operation!`,life: 3000});
        return
      }
      const movie = {
        id: this.movie.id,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date,
        title: this.movie.title,
        vote_average: this.movie.vote_average
      }
      if(this.movie.isFavorite.__zone_symbol__value){
        this.movie.isFavorite.__zone_symbol__value = false
      }else{
        this.movie.isFavorite = {
          __zone_symbol__state: true,
          __zone_symbol__value: true
        }
      }
      this.firestoreService.updateList('movies',movie).then(
      ()=>{
        
          if(this.movie?.isFavorite.__zone_symbol__value == true){
            // ('success','Welcome Back',res, 5000)
            this.onFavorite.emit({severity:'success',summary:'Movie Added', detail:`${this.movie.title} has been added to your favourites`,life: 3000});
          }else{
            this.onFavorite.emit({severity:'info',summary:'Movie Removed', detail:`${this.movie?.title} has been removed from your favourites`,life: 3000});
          }
        }
      ).catch(
        (err)=>{
          console.log(err);
          
          this.onFavorite.emit({severity:'error',summary:'Failed', detail:`Failed to update your favorites`,life: 3000});
        }
      )
    }
    
  }
}
