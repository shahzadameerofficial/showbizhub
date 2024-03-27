import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TmdbService } from '../../services/tmdb.service';
import { AutoCompleteCardComponent } from "../cards/auto-complete-card/auto-complete-card.component";
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';
import {storedUser} from '../../interface/auth.interface';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeService } from '../../services/theme.service';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterModule, AutoCompleteModule, ReactiveFormsModule, AutoCompleteCardComponent, MenubarModule, ButtonModule, MenuModule, AvatarModule, FormsModule, InputSwitchModule, SidebarModule]
})
export class HeaderComponent{
  currentUser: storedUser | any
  userImg = '';
  navigationMenu = [
    {
      label: 'Menu',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home'
        },
        {
          label: 'Discover+',
          icon: 'pi pi-map',
          routerLink: '/discover'
        },
        {
          label: 'Trending',
          icon: 'pi pi-chart-bar',
          routerLink: '/trending'
        },
        {
          label: 'Movies',
          icon: 'pi pi-video',
          routerLink: '/movies'
        },
        {
          label: 'TV Shows',
          icon: 'pi pi-play',
          routerLink: '/tvshows'
        },
        {
          label: 'Celebrities',
          icon: 'pi pi-users',
          routerLink: '/celebrities'
        }

      ]
    }
  ]
  userMenu: any = [
    {
          label: 'ShowbizHub' ,
          items: [
            {
              label: 'Login',
              icon: 'pi pi-sign-in',
              routerLink: '/login'
            },
            {
              label: 'User Settings',
              icon: 'pi pi-user',
              routerLink: '/settings',
            }
          ]
        }
  ]
  sidebarVisible:boolean = false
  constructor(private tmdbService: TmdbService, private router: Router, private authService: AuthService, private themeService:ThemeService) {
    const auth:any = authService.getLoggedInUser()
    if (!auth.demoAccount) {
      const {user,data} = auth
      this.currentUser = auth
      this.userMenu[0].label = data.username
      this.userMenu[0].items[0] = {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        routerLink: null,
        command: () => {
          localStorage.removeItem('user');
          this.router.navigate(['/login'])
          window.location.reload();
        }
      }
      this.userMenu[0].items[2] = {
        label: 'Favorites',
        icon: 'pi pi-heart-fill',
        routerLink: '/favorites'
      }
      this.searchForm.get('theme')?.setValue(data.dark_mode)
    }else{
      this.currentUser = auth;
      this.searchForm.get('theme')?.setValue(auth.dark_mode)
    }
    
    
  }
  switchTheme(e:any){
    
    if (this.currentUser.demoAccount) {
      localStorage.setItem( 'user', JSON.stringify({...this.currentUser, dark_mode: !this.currentUser.dark_mode}))
      if (e.checked) {
        this.themeService.updateTheme('night')
      }else{
        this.themeService.updateTheme('light')
      }
    }else{
      const updatedData = {
        ...this.currentUser.data,
        dark_mode: !this.currentUser.data.dark_mode
      }
      this.themeService.updateTheme(updatedData.dark_mode ? 'night' : 'light')
      
      this.authService.updateUserData(updatedData,this.currentUser.user.id).then(
        ()=>{
          localStorage.setItem('user',JSON.stringify(
            {user: this.currentUser.user,
              data:updatedData}
              ));
          this.currentUser.data = updatedData
        }
      )
      
    }
  }
  results: any[] = []
  items: any[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/home'
    },
    {
      label: 'Discover+',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/discover'
    },
    {
      label: 'Trending',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/trending'
    },
    {
      label: 'Movies',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/movies'
    }
  ];
  searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
    theme: new FormControl(false)
  })
  currentQuery: string = ''
  filterResults(e: any) {
    this.currentQuery = e.query
    this.getResults(e.query)
  }
  initSearch(e: any) {
    if (e.code == 'Enter' || e == 'button') {
      
      this.router.navigate([`/search/${this.currentQuery}`,])
      this.tmdbService.setState({ searchQuery: this.currentQuery })
      this.searchForm.get('query')?.setValue(this.currentQuery)
      this.results = []
    }
  }
  getResults(query: string) {
    this.tmdbService.getTMDBData(`search/multi`, {query}).subscribe(
      (res: any) => {
        this.results = res.results
      }
    )
  }
  gotoResult() {
    const mediaType = this.searchForm.value.query.media_type;
    const mediaId = this.searchForm.value.query.id
    if (mediaType === 'movie') {
      this.router.navigate([`movies/${mediaId}`])
    } else if (mediaType === 'tv') {
      this.router.navigate([`tvshows/${mediaId}`])
    } else if (mediaType === 'person') {
      this.router.navigate([`celebrities/${mediaId}`])
    }
  }
}
