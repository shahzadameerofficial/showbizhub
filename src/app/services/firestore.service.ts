import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  currentUser:any
  constructor(private firestore:Firestore, private authService:AuthService) { 
    this.currentUser = this.authService.getLoggedInUser()
  }
  favourites:any = {
    movies: [],
    tvshows: [],
    celebrities: [],
    combined: []
  }
  async isFavorite(itemId: number, type:string) {
    await this.getList()
    if (this.favourites[type].some((item:any) => item.id === itemId)) {
      return true
    }else{
      return false;
    }
  }
  async getList(){
    
    if (!this.currentUser.user) {
      this.currentUser = await this.authService.getLoggedInUser()
    }
    if (this.currentUser?.user?.id) {
      const docSnap = await getDoc(doc(this.firestore,'savedList',this.currentUser.user.id))
    if (docSnap.exists()) {
      const data:any = docSnap.data()
      this.favourites.movies = data.movies
      this.favourites.tvshows = data.tvshows
      this.favourites.celebrities = data.celebrities
      this.favourites.combined = data.combined
      return data
    }else{
      return
    }
    }
  }
  async updateList(target:string,value:any){
    if (!this.currentUser.user) {
      this.currentUser = await this.authService.getLoggedInUser()
    }
    if (this.currentUser.demoAccount === false) {
      const documentRef = doc(this.firestore, 'savedList', this.currentUser.user.id);
    const doctsnap = await getDoc(documentRef)
    if (doctsnap.exists()) {
      let data = doctsnap.data()
      this.favourites = data
      const index = data[target].findIndex((item:any) => item.id === value.id);

      if (index > -1) {
        data[target].splice(index, 1);
      } else {
        data[target].unshift(value);
      }
      this.favourites = data
      
      return await updateDoc(documentRef,data)
      
    }
    }
  }
  
}
