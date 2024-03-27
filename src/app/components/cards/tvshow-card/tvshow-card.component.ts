import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { CircleRatingComponent } from "../../circle-rating/circle-rating.component";
import { ImgComponent } from "../../common/img/img.component";
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-tvshow-card',
    standalone: true,
    templateUrl: './tvshow-card.component.html',
    styleUrl: './tvshow-card.component.scss',
    imports: [RouterModule, CommonModule, CircleRatingComponent, ImgComponent]
})
export class TvshowCardComponent {
  @Input() tvShow:any = ''
  @Output() onFavorite = new EventEmitter;

  url = 'http://image.tmdb.org/t/p/w342';
  placeholder = '../../../assets/images/defualt_poster.png'
  
  backgroundPath = ``
    constructor(private firestoreService:FirestoreService, private authService:AuthService){
      let backgroundKey = this.tvShow.poster_path;
      let backgroundUrl = 'http://image.tmdb.org/t/p/w342';
      if (backgroundKey) {
        this.backgroundPath = backgroundUrl+backgroundKey;
      }else{
        this.backgroundPath = '../../../assets/images/defualt_poster.png'
      }
    }

    addToFavourites(){
      if (this.tvShow) {
        
      if(this.authService.loggedInUser().demoAccount == true){
        this.onFavorite.emit({severity:'error',summary:'Unauthorized', detail:`Please Login to Perform this Operation!`,life: 3000});
        return
      }
        const tvshow = {
          id: this.tvShow.id,
          poster_path: this.tvShow.poster_path,
          first_air_date: this.tvShow.first_air_date,
          name: this.tvShow.name,
          vote_average: this.tvShow.vote_average
        }
        if(this.tvShow?.isFavorite?.__zone_symbol__value){
          this.tvShow.isFavorite.__zone_symbol__value = false
        }else{
          this.tvShow.isFavorite = {
            __zone_symbol__state: true,
            __zone_symbol__value: true
          }
        }
        this.firestoreService.updateList('tvshows',tvshow).then(
        ()=>{
            if(this.tvShow?.isFavorite.__zone_symbol__value){
              // ('success','Welcome Back',res, 5000)
              this.onFavorite.emit({severity:'success',summary:'TV Show Added', detail:`${this.tvShow?.name} has been added to your favourites`,life: 5000});
            }else{
              this.onFavorite.emit({severity:'info',summary:'TV Show Removed', detail:`${this.tvShow?.name} has been removed from your favourites`,life: 5000});
            }
          }
        ).catch(
          ()=>{
            this.onFavorite.emit({severity:'error',summary:'Failed', detail:`Failed to update your favorites`,life: 5000});
          }
        )
      }
      
    }
}
