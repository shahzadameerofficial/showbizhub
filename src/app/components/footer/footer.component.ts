import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { AutoCompleteCardComponent } from '../cards/auto-complete-card/auto-complete-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AutoCompleteCardComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  latest:any = {
    movie:{},
    tv:{},
    celebrity:{}
  }
  constructor(private tmdbService:TmdbService) {
    this.getLatest('movie')
    this.getLatest('person')
    this.getLatest('tv')
  }
  getLatest(media:string){
    this.tmdbService.getTMDBData(`${media}/latest`).subscribe(
      async(response:any) => {
        if (media == 'movie') {
          this.latest.movie = await response;
        }else if(media == 'tv'){
          this.latest.tv = await response;
        }else{
          this.latest.celebrity = await response;
        }
      }
    )
    // this.setSlides()
  }
  setSlides(){
    const displayContainer = document.getElementById("displayContainer") as HTMLDivElement;
    let filtered:any = []
    for (const iterator of this.latest) {
      if (iterator.poster_path || iterator.profile_path) {
        filtered.push(iterator)
      }
    }
    if (filtered.length > 0) {
      setInterval(() => {
        displayContainer.style.backgroundImage = `url(http://image.tmdb.org/t/p/original${filtered[0].profile_path || filtered[0].poster_path})`
      }, 5000);
    }
  }
}
