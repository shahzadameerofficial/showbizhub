import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { SignalsSimpleStoreService } from './SignalSimpleStoreService.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})


export class TmdbService extends SignalsSimpleStoreService<any> {
  configurations:any = signal({})
  languages:any = signal({})
  countries:any = signal({})
  timezones:any = signal({})
  searchQuery:string = '';

  constructor(private http:HttpClient, private authService:AuthService) {
    super()
   }
   savingMode:any = {
    normal:{
      backdrop_size: "w1280",
      logo_size: "w500",
      poster_size: "w780",
      profile_size: "h632",
      still_size: "w300",
      baseUrl: "http://image.tmdb.org/t/p/"
    },
    high:{
      backdrop_size: "w780",
      logo_size: "w154",
      poster_size: "w154",
      profile_size: "w185",
      still_size: "w185",
      baseUrl: "http://image.tmdb.org/t/p/"
    },
    ultra:{
      backdrop_size: "w300",
      logo_size: "w45",
      poster_size: "w342",
      profile_size: "w45",
      still_size: "w92",
      baseUrl: "http://image.tmdb.org/t/p/"
    }
   }

   

   async getSavingMode(){
    const user = await this.authService.getLoggedInUser()
    // console.log(user);
    
    if (user?.data_saving_mode && user?.data_saving_type) {
      return this.savingMode[user.data_saving_type]
    }else{
      return 'http://image.tmdb.org/t/p/original'
    }
   }

   timeWindow = signal('day')
  getTMDBData(path:string, params: object = {}){
    return this.http.get<any>(`${environment.TMDB_BASE_URL}${path}`,{
      headers: {
        Authorization: `bearer ${environment.TMDB_ACCESS_TOKEN}`
      },
      params: {
        ...params,
        region: 'IN',
        language: 'en'
      }
    })
  }
  // return this.http.get<any>(`${environment.TMDB_BASE_URL}${path}${environment.T}${params}&region=IN&language=en`)
}