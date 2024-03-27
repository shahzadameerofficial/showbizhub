import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TmdbService } from './services/tmdb.service';
import { Store, select } from '@ngrx/store';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { PrimeNGConfig } from 'primeng/api';
import {Auth} from '@angular/fire/auth'
import { FooterComponent } from "./components/footer/footer.component";
import { FirestoreService } from './services/firestore.service';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CustomTagComponent } from "./components/custom-tag/custom-tag.component";
import { ScrollTopComponent } from "./components/scroll-top/scroll-top.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LoadingBarRouterModule, LoadingBarHttpClientModule, LoadingBarModule, HttpClientModule, DialogModule, CustomTagComponent, ScrollTopComponent]
})
export class AppComponent implements OnInit{
  title = 'showbizhub';
  count$: any;
  pagenum = 1;
  visible:boolean = false
  constructor(private tmdbService:TmdbService, private store:Store, private primeNgConfig: PrimeNGConfig, private afAuth:Auth, private firestoreService:FirestoreService, private authService:AuthService, private themeService:ThemeService){
    this.primeNgConfig.ripple = true
    this.primeNgConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
  };
  if(!localStorage.getItem('popup')){
    this.visible = true
  }
  
    
    this.getConfigurations()
    this.getLanguages()
    this.getCountries()
    this.getTimezones()
    
  }
  updatePopup(){
    localStorage.setItem("popup",'true')
  }
  ngOnInit(): void {
    let user = this.authService.getLoggedInUser();
    if (user) {
      if(user.demoAccount){
        this.themeService.updateTheme(user.dark_mode ? 'night' : 'light')
      }else{
        this.themeService.updateTheme(user.data.dark_mode ? 'night' : 'light')
      }
    }
  }
  getConfigurations(){
    this.tmdbService.getTMDBData('configuration').subscribe(
      (res:any)=>{
        this.tmdbService.configurations.set(res)
        this.tmdbService.setState({configurations: {
          images: res.images,
          change_keys: res.change_keys
        }})
      }
    )
  }
  getLanguages(){
    this.tmdbService.getTMDBData('configuration/languages').subscribe(
      (res:any)=>{
        this.tmdbService.languages.set(res)
        
        this.tmdbService.setState({languages: res})
      }
    )
  }
  getCountries(){
    this.tmdbService.getTMDBData('configuration/countries').subscribe(
      (res:any)=>{
        this.tmdbService.countries.set(res)
        
        this.tmdbService.setState({countries: res})
      }
    )
  }
  getTimezones(){
    this.tmdbService.getTMDBData('configuration/timezones').subscribe(
      (res:any)=>{
        this.tmdbService.timezones.set(res)
        this.tmdbService.setState({timezones: res})
      }
    )
  }
}
