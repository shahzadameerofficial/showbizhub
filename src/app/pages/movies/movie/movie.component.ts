import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../../components/cards/movie-card/movie-card.component";
import { RuntimePipe } from "../../../pipes/runtime.pipe";
import { GalleriaModule } from 'primeng/galleria';
import { CircleRatingComponent } from "../../../components/circle-rating/circle-rating.component";
import { MediaGalleryComponent } from "../../../components/media-gallery/media-gallery.component";
import { MiniCelebrityCardComponent } from "../../../components/cards/mini-celebrity-card/mini-celebrity-card.component";
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { MovieDetails } from '../../../interface/movie-details.interface';
import { MovieImages } from '../../../interface/movie-images.interface';
import { MovieVideo } from '../../../interface/movie-videos.interface';
import { MovieCredits } from '../../../interface/movie-credits.interface';
import { TabViewModule } from 'primeng/tabview';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";
import { Movie, Movies } from '../../../interface/movies.interface'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BadgeModule } from 'primeng/badge';
import { RatingModule } from 'primeng/rating';
import { CardsCarouselComponent } from "../../../components/cards-carousel/cards-carousel.component";
import { MiniCarouselComponent } from "../../../components/mini-carousel/mini-carousel.component";
import { ReleaseStatusComponent } from "../../../components/release-status/release-status.component";
import { CustomTagComponent } from "../../../components/custom-tag/custom-tag.component";
import { MovieKeywords } from '../../../interface/movie-keywords.interface';
import { CustomBedgeComponent } from "../../../components/custom-bedge/custom-bedge.component";
import { TopTitlesComponent } from "../../../components/top-titles/top-titles.component";
import { DetailsLineComponent } from "../../../components/details-line/details-line.component";
import { ImgComponent } from "../../../components/common/img/img.component";
import { ButtonModule } from 'primeng/button';
import { PageLoaderComponent } from "../../../components/page-loader/page-loader.component";

@Component({
    selector: 'app-movie',
    standalone: true,
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.scss',
    imports: [CommonModule, MovieCardComponent, RuntimePipe, RouterModule, GalleriaModule, CircleRatingComponent, MediaGalleryComponent, MiniCelebrityCardComponent, CarouselModule, ChipModule, TabViewModule, CardsContainerComponent, InfiniteScrollModule, BadgeModule, RatingModule, CardsCarouselComponent, MiniCarouselComponent, ReleaseStatusComponent, CustomTagComponent, CustomBedgeComponent, TopTitlesComponent, DetailsLineComponent, ImgComponent, ButtonModule, PageLoaderComponent]
})
export class MovieComponent implements OnInit {
  @ViewChild('player') player!: ElementRef<HTMLIFrameElement>;
  isTrailer:boolean = true;
  isLoading:boolean = true;
  constructor(private tmdbService: TmdbService, private activatedRoute: ActivatedRoute) {
  }
  imdbUrl: string = 'https://www.imdb.com/title/'
  concatToString(arrayOfObjects : any , targetPropertyName: string){
    return arrayOfObjects.map((item:any) => item[targetPropertyName]).join(', ')
  }
  ngOnInit(): void {
    this.getId()
  }
  // Variables Initialization
  movieId: string | undefined
  movieDetails: MovieDetails | undefined
  movieImages: MovieImages = {
    backdrops: [],
    posters: [],
    id: 1,
    logos: []
  }
  movieVideos: MovieVideo[] = []
  movieCredits: MovieCredits = {
    id: 0,
    cast: [],
    crew: []
  }
  similarMovies: Movies = {
    page: 1,
    total_pages: 1,
    total_results: 20,
    results: []
  }
  recommendedMovies: Movies = {
    page: 1,
    total_pages: 1,
    total_results: 20,
    results: []
  }
  keywords: MovieKeywords | any
  imageUrl: string = 'http://image.tmdb.org/t/p/original'
  logoUrl: string = 'http://image.tmdb.org/t/p/w45'
  
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  getId() {
    this.activatedRoute.params.subscribe(
      (res: any) => {
        this.isLoading = true
        this.movieId = res.id
        window.scrollTo(0,0)
        this.getVideos()
        this.getDetails()
        this.getImages()
        this.getCredits()
        this.getSimilar()
        this.getRecommendations()
        this.getKeywords()
      }
    )
  }
  getDetails() {
    this.movieDetails = undefined
    this.tmdbService.getTMDBData(`movie/${this.movieId}`).subscribe(
      (response: MovieDetails) => {
        this.movieDetails = response
        console.log(response);
        this.isLoading = false
      },(err)=>{
        this.isLoading = false
      }
    )
  }

  getImages() {
    this.movieImages = {backdrops:[],posters:[],logos:[],id:0};
    this.tmdbService.getTMDBData(`movie/${this.movieId}/images`).subscribe(
      (response: MovieImages) => {
        this.movieImages = response
        console.log(response);
        this.setSwipe()
      }
    )
  }
  currentVideoType:string = ''
   getVideos() {
    this.movieVideos = []
    this.tmdbService.getTMDBData(`movie/${this.movieId}/videos`).subscribe(
      async (response: any) => {
        this.movieVideos = await response.results
        const youtubeEmbedUrl = 'https://www.youtube.com/embed/'
        this.movieVideos?.forEach( (video:MovieVideo)=>{
          // If Trailer Found
          if (video.type == 'Trailer') {
            this.player.nativeElement.src = `${youtubeEmbedUrl}${video.key}`
            this.currentVideoType = video.type
            return

            // If Trailer Not Found But Teaser Found
          }else if(video.type != 'Trailer' && video.type == 'Teaser'){
            this.player.nativeElement.src = `${youtubeEmbedUrl}${video.key}`
            this.currentVideoType = video.type
            return

            // If Trailer & Teaser Both Are Not Present then Look For Featurette Video
          }else if(video.type != 'Trailer' && video.type != 'Teaser' && video.type == 'Featurette'){
            this.player.nativeElement.src = `${youtubeEmbedUrl}${video.key}`
            this.currentVideoType = video.type
            return

            // If All of them are not present then anyone video will be set to default
          }else{
            this.player.nativeElement.src = `${youtubeEmbedUrl}${video.key}`
            this.currentVideoType = video.type
            return
          }
        })
        if (response?.results?.length == 0) {
          this.isTrailer = false
        }
      }
    )
  }
  getCredits() {
    this.movieCredits = {id: 0,cast: [],crew: []}
    this.tmdbService.getTMDBData(`movie/${this.movieId}/credits`).subscribe(
      (response: MovieCredits) => {
        // console.log(response);
        this.movieCredits = response
      }
    )
  }
  getSimilar() {
    this.similarMovies = {
      ...this.similarMovies,
      results: []
    }
    this.tmdbService.getTMDBData(`movie/${this.movieId}/similar`).subscribe(
      (response: Movies) => {
        // console.log(response);
        this.similarMovies = response
      }
    )
  }
  getRecommendations() {
    this.recommendedMovies = {
      ...this.recommendedMovies,
      results: []
    }
    this.tmdbService.getTMDBData(`movie/${this.movieId}/recommendations`).subscribe(
      (response: Movies) => {
        this.recommendedMovies = response
      }
    )
  }
  getKeywords() {
    this.keywords = undefined
    this.tmdbService.getTMDBData(`movie/${this.movieId}/keywords`).subscribe(
      (response: MovieKeywords) => {
        this.keywords = response
      }
    )
  }

  setSwipe(){
    if (this.movieImages.backdrops.length > 1) {
      console.log('found images');
      
      const bg = document.querySelector('.movie-details') as HTMLDivElement
      let hammer = new Hammer(bg)
      hammer.on('swipeleft swiperight',(event:any)=>{
        console.log(event.type);
        
        if (event.type === 'swipeleft') {
          this.switchBackdrop(1)
        }else{
          this.switchBackdrop(-1)
        }
      })
    } 
  }
  currentIndex:number = 0
  switchBackdrop(change:number){
    if(change === 1 && this.movieDetails){
      if (this.currentIndex < this.movieImages?.backdrops?.length - 1) {
        this.currentIndex = this.currentIndex + change;
        this.movieDetails.backdrop_path = this.movieImages.backdrops[this.currentIndex].file_path
      }else{
        this.currentIndex = 0
        this.movieDetails.backdrop_path = this.movieImages.backdrops[this.currentIndex].file_path
      }
    }else if(change === -1 && this.movieDetails){
      if (this.currentIndex != 0) {
        this.currentIndex = this.currentIndex + change
        this.movieDetails.backdrop_path = this.movieImages.backdrops[this.currentIndex].file_path
      }else{
        this.currentIndex = this.movieImages?.backdrops?.length - 1
        this.movieDetails.backdrop_path = this.movieImages.backdrops[this.currentIndex].file_path
      }
    }
  }

  appendMoreMovies(endpoint: string, arrayName: string) {
    let currentPage = 1;
    if (arrayName == 'similarMovies' && this.similarMovies.page < 500) {
      currentPage = this.similarMovies.page + 1
    }
    if (arrayName == 'recommendedMovies' && this.recommendedMovies.page < 500) {
      currentPage = this.recommendedMovies.page + 1
    }
    if (currentPage > 500) {
      return
    }
    this.tmdbService.getTMDBData(`movie/${this.movieId}/${endpoint}`, {page: currentPage}).subscribe(
      (response: Movies) => {
        console.log(response);
        if (arrayName == 'similarMovies') {
          this.similarMovies.page = response.page
          this.similarMovies.total_pages = response.total_pages
          this.similarMovies.total_results = response.total_results
          response.results.forEach((movie: Movie) => {
            this.similarMovies.results.push(movie)
          })
        } else if (arrayName == 'recommendedMovies') {
          this.recommendedMovies.page = response.page
          this.recommendedMovies.total_pages = response.total_pages
          this.recommendedMovies.total_results = response.total_results
          response.results.forEach((movie: Movie) => {
            this.recommendedMovies.results.push(movie)
          })
        }

      }
    )
  }
}
