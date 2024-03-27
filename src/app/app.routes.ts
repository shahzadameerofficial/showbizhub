import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movies/movie/movie.component';
import { HomeComponent } from './pages/home/home.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';
import { TvshowComponent } from './pages/tvshows/tvshow/tvshow.component';
import { CelebritiesComponent } from './pages/celebrities/celebrities.component';
import { CelebrityComponent } from './pages/celebrities/celebrity/celebrity.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { AllTrendingComponent } from './pages/trending/all-trending/all-trending.component';
import { MoviesTrendingComponent } from './pages/trending/movies-trending/movies-trending.component';
import { TvshowsTrendingComponent } from './pages/trending/tvshows-trending/tvshows-trending.component';
import { CelebritiesTrendingComponent } from './pages/trending/celebrities-trending/celebrities-trending.component';
import { CelebritiesSearchComponent } from './pages/search/celebrities-search/celebrities-search.component';
import { TvshowSearchComponent } from './pages/search/tvshow-search/tvshow-search.component';
import { MoviesSearchComponent } from './pages/search/movies-search/movies-search.component';
import { AllSearchComponent } from './pages/search/all-search/all-search.component';
import { SearchComponent } from './pages/search/search.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { authGuard } from './gaurds/auth.guard';
import { PasswordResetComponent } from './pages/auth/password-reset/password-reset.component';
import { FavoritesComponent } from './pages/auth/favorites/favorites.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    // {path:'password-reset', component:PasswordResetComponent},
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent},
    {path:'favorites', component:FavoritesComponent, canActivate:[authGuard]},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'movies', component:MoviesComponent},
    {path:'movies/:id', component:MovieComponent},
    {path:'tvshows', component:TvshowsComponent},
    {path:'tvshows/:id', component:TvshowComponent},
    {path:'celebrities', component:CelebritiesComponent},
    {path:'celebrities/:id', component:CelebrityComponent},
    {path:'discover', component:DiscoverComponent},
    {path:'settings', component:SettingsComponent, canActivate:[authGuard]},

    {path:'trending', component:TrendingComponent, children:[
        {path:'', component:AllTrendingComponent},
        {path:'movies', component:MoviesTrendingComponent},
        {path:'tvshows', component:TvshowsTrendingComponent},
        {path:'celebrities', component:CelebritiesTrendingComponent},
    ]},
    {path:'search', component:SearchComponent, children:[
        {path:':query', component:AllSearchComponent},
        {path:'movies/:query', component:MoviesSearchComponent},
        {path:'tvshows/:query', component:TvshowSearchComponent},
        {path:'celebrities/:query', component:CelebritiesSearchComponent},
    ]},
    {path:'**', component:PageNotFoundComponent},

];
