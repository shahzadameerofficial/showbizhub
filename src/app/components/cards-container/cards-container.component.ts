import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MovieCardComponent } from "../cards/movie-card/movie-card.component";
import { TvshowCardComponent } from "../cards/tvshow-card/tvshow-card.component";
import { CelebrityCardComponent } from "../cards/celebrity-card/celebrity-card.component";
import { FirestoreService } from '../../services/firestore.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TmdbService } from '../../services/tmdb.service';
import { Movie, Movies } from '../../interface/movies.interface';
import { TVShow, TVShows } from '../../interface/tvshows.interface';
import { Celebrities, Celebrity } from '../../interface/celebrities.interface';
import { CardSkeletonComponent } from "../skeletons/card-skeleton/card-skeleton.component";
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-cards-container',
    standalone: true,
    templateUrl: './cards-container.component.html',
    styleUrl: './cards-container.component.scss',
    providers: [MessageService],
    imports: [MovieCardComponent, TvshowCardComponent, CelebrityCardComponent, ToastModule, InfiniteScrollModule, CardSkeletonComponent, ButtonModule]
})
export class CardsContainerComponent implements AfterViewInit, OnChanges {
  @Input() movies:any = undefined
  @Input() containerType: 'movies' | 'tvshows' | 'celebrities' | 'combined' | '' = ''
  @Input() tvshows:any = undefined
  @Input() celebrities:any = undefined;
  @Input() combined:any = undefined;
  @Input() path:string = '';
  @Input() params:any = '';
  @Input() queryParams:object = {};
  @Input() multipleResults: boolean = false;
  @Input() autoLoad:boolean = true
  @Output() onInfiniteScroll = new EventEmitter()

  loading:boolean = false;
  loadError:boolean = false
  constructor(private firestoreService:FirestoreService, private messageService:MessageService, private tmdbService:TmdbService, private router: Router, private route: ActivatedRoute){ 
    this.loader.length = 20
  }
  loader = []
  reloadComponent() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.path || changes['params'] || changes['queryParams']) {
      this.getResults()
    }
    if(changes['movies']){
      this.movies?.map((element:any) => {
        
        this.moviesResults.results.push({
          ...element,
          isFavorite: this.firestoreService.isFavorite(element.id, 'movies')
        }) 
      });
    }else if(changes['tvshows']){
      this.tvshows?.map((element:any) => {
        this.tvshowResults.results.push({
          ...element,
          isFavorite: this.firestoreService.isFavorite(element.id, 'tvshows')
        }) 
      });
    }else if(changes['celebrities']){
      this.celebrities?.map((element:any) => {
        this.celebritiesResults.results.push({
          ...element,
          isFavorite: this.firestoreService.isFavorite(element.id, 'celebrities')
        }) 
      });
    }else if(changes['combined']){
      this.combined?.map((element:any) => {
        this.combinedResults.results.push({
          ...element,
          isFavorite: this.firestoreService.isFavorite(element.id, 'combined')
        }) 
      });
    }
  }
  ngAfterViewInit(): void {
    
  }
  startLoading(){
    this.autoLoad = true;
    this.getMoreResults()
  }
  
  
  // this.modMovies = this.movies?.map((item:any) => ({
  //   ...item,
  //   isFavorite: this.firestoreService.isFavorite(item.id),
  // }));
  moviesResults: Movies = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  }
  tvshowResults: TVShows = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  }
  celebritiesResults: Celebrities = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  }
  combinedResults: any = {
    total_pages: 1,
    total_results: 20,
    page: 1,
    results: []
  }

  getResults(){
    this.loading = true;
    this.loadError = false;
    this.moviesResults.results = [];
    this.tvshowResults.results = [];
    this.celebritiesResults.results = [];
    this.combinedResults.results = [];
    this.tmdbService.getTMDBData(this.path + this.params , this.queryParams).subscribe(
      (response:any) => {
        
        if (this.containerType === 'movies') {
          
          response.results.map(async (item:any) => (
            this.moviesResults.results.push({
              ...item,
              isFavorite: await this.firestoreService.isFavorite(item.id,'movies'),
            })
            ));
          this.moviesResults.total_pages = response.total_pages
          this.moviesResults.page = response.page
          this.moviesResults.total_results = response.total_results

        }else if(this.containerType === 'celebrities'){
          this.celebritiesResults.results = response.results.map((item:any) => ({
            ...item,
            isFavorite: this.firestoreService.isFavorite(item.id, 'celebrities'),
          }));
          this.celebritiesResults.total_pages = response.total_pages
          this.celebritiesResults.page = response.page
          this.celebritiesResults.total_results = response.total_results
          
        }else if(this.containerType === 'tvshows'){
          this.tvshowResults.results = response.results.map((item:any) => ({
            ...item,
            isFavorite: this.firestoreService.isFavorite(item.id, 'tvshows'),
          }));
          this.tvshowResults.total_pages = response.total_pages
          this.tvshowResults.page = response.page
          this.tvshowResults.total_results = response.total_results
          
        }else if(this.containerType === 'combined'){
          this.combinedResults.results = response.results.map((item:any) => ({
            ...item,
            isFavorite: this.firestoreService.isFavorite(item.id, item.media_type == 'movie' ? 'movies' : item.media_type == 'tv' ? 'tvshows' : 'celebrities'),
          }));
          this.combinedResults.total_pages = response.total_pages
          this.combinedResults.page = response.page
          this.combinedResults.total_results = response.total_results
        }
        this.loading = false
      },(error:any)=>{
        this.showToast({severity:'error', summary: `Error ${error.error.status_code}`, detail: error.error.status_message, life: 5000})
        this.loading = false
        this.loadError = true
      }
    )
  }
  getMoreResults(){
    if (!this.multipleResults || !this.autoLoad) {
      return
    }
    if (this.containerType === 'movies') {
      if (this.moviesResults.total_pages > this.moviesResults.page) {
        
    this.loading = true
    this.loadError = false
        this.tmdbService.getTMDBData(this.path + this.params, {...this.queryParams, page: this.moviesResults.page + 1}).subscribe(
          (response:Movies)=>{
            this.moviesResults.total_pages = response.total_pages;
            this.moviesResults.page = response.page;
            this.moviesResults.total_results = response.total_results;
            response.results.map((movie:Movie) => {
              this.moviesResults.results.push({...movie,
              isFavorite: this.firestoreService.isFavorite(movie.id, 'movies')})
            });
            this.loading = false
          },(error:any)=>{
            this.showToast({severity:'error', summary: `Error ${error.error.status_code}`, detail: error.error.status_message, life: 5000})
            this.loading = false
            this.loadError = true
          }
        )
      }
    }else if (this.containerType === 'tvshows') {
      if (this.tvshowResults.total_pages > this.tvshowResults.page) {
        
    this.loading = true
    this.loadError = false
        this.tmdbService.getTMDBData(this.path + this.params, {...this.queryParams, page: this.tvshowResults.page + 1}).subscribe(
          (response:TVShows)=>{
            this.tvshowResults.total_pages = response.total_pages;
            this.tvshowResults.page = response.page;
            this.tvshowResults.total_results = response.total_results;
            response.results.map((tvshow:TVShow) => {
              this.tvshowResults.results.push({...tvshow,
                isFavorite: this.firestoreService.isFavorite(tvshow.id, 'tvshows') })
            });
            this.loading = false
          },(error:any)=>{
            this.showToast({severity:'error', summary: `Error ${error.error.status_code}`, detail: error.error.status_message, life: 5000})
            this.loading = false
            this.loadError = true
          }
        )
      }
    }else if (this.containerType === 'celebrities') {
      if (this.celebritiesResults.total_pages > this.celebritiesResults.page) {
        
    this.loading = true
    this.loadError = false
        this.tmdbService.getTMDBData(this.path + this.params,{...this.queryParams, page: this.celebritiesResults.page + 1}).subscribe(
          (response:Celebrities)=>{
            this.celebritiesResults.total_pages = response.total_pages;
            this.celebritiesResults.page = response.page;
            this.celebritiesResults.total_results = response.total_results;
            response.results.forEach((celebrity:Celebrity) => {
              this.celebritiesResults.results.push({
                ...celebrity,
                isFavorite:this.firestoreService.isFavorite(celebrity.id, 'celebrities')
              })
            });
            this.loading = false
          },(error:any)=>{
            this.showToast({severity:'error', summary: `Error ${error.error.status_code}`, detail: error.error.status_message, life: 5000})
            this.loading = false
            this.loadError = true
          }
        )
      }
    }else if(this.containerType === 'combined'){
      if (this.combinedResults.total_pages > this.combinedResults.page) {
        
    this.loading = true
    this.loadError = false
        this.tmdbService.getTMDBData(this.path + this.params, {...this.queryParams, page: this.combinedResults.page + 1}).subscribe(
          (response:Celebrities)=>{
             response.results.map((item:any) => (
              this.combinedResults.results.push({
                ...item,
                isFavorite: this.firestoreService.isFavorite(item.id, item.media_type == 'movie' ? 'movies' : item.media_type == 'tv' ? 'tvshows' : 'celebrities'),
              })
              ));
            this.combinedResults.total_pages = response.total_pages
            this.combinedResults.page = response.page
            this.combinedResults.total_results = response.total_results
            this.loading = false
          },(error:any)=>{
            this.showToast({severity:'error', summary: `Error ${error.error.status_code}`, detail: error.error.status_message, life: 5000})
            this.loading = false
            this.loadError = true
          }
        )
      }
    }

  }
  
  
  showToast(settings:any){
    this.messageService.add({severity: settings.severity, summary: settings?.summary, detail: settings?.detail, life: settings?.life})
  }
}
