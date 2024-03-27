import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { ImgComponent } from "../../common/img/img.component";
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-celebrity-card',
    standalone: true,
    templateUrl: './celebrity-card.component.html',
    styleUrl: './celebrity-card.component.scss',
    imports: [CommonModule, RouterModule, ImgComponent]
})
export class CelebrityCardComponent {
  @Input() person:any = ''
  @Output() onFavorite = new EventEmitter<any>();
  genders = ['Other', 'Female', 'Male'];
  placeholder:string = '../../../assets/images/defualt_poster.png';
  profileUrl:string = 'http://image.tmdb.org/t/p/w342'

  constructor(private firestoreService:FirestoreService, private authService:AuthService){}
  addToFavourites(){
    
    if(this.authService.loggedInUser().demoAccount == true){
      this.onFavorite.emit({severity:'error',summary:'Unauthorized', detail:`Please Login to Perform this Operation!`,life: 3000});
      return
    }
    if (this.person) {
      const tvshow = {
        id: this.person.id,
        profile_path: this.person.profile_path,
        known_for_department: this.person.known_for_department,
        name: this.person.name,
        gender: this.person.gender
      }
      if(this.person?.isFavorite?.__zone_symbol__value){
        this.person.isFavorite.__zone_symbol__value = false
      }else{
        this.person.isFavorite = {
          __zone_symbol__state: true,
          __zone_symbol__value: true
        }
      }
      this.firestoreService.updateList('celebrities',tvshow).then(
      ()=>{
          if(this.person?.isFavorite.__zone_symbol__value){
            // ('success','Welcome Back',res, 5000)
            this.onFavorite.emit({severity:'success',summary:'Celebrity Added', detail:`${this.person?.name} has been added to your favourites`,life: 5000});
          }else{
            this.onFavorite.emit({severity:'info',summary:'Celebrity Removed', detail:`${this.person?.name} has been removed from your favourites`,life: 5000});
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
