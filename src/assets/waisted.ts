

activeIndex: number = 0;
displayCustom: boolean = false;
imageClick(index: number) {
  this.activeIndex = index;
  this.displayCustom = true;
}
responsiveOptions: any[] = [
{
    breakpoint: '1500px',
    numVisible: 5
},
{
    breakpoint: '1024px',
    numVisible: 3
},
{
    breakpoint: '768px',
    numVisible: 2
},
{
    breakpoint: '560px',
    numVisible: 1
}
];


mymovie:any;
allMovies:any;
movieGenre:string = '';
movieBackdropImages:any;
moviePosterImages:any;
availableLanguages:string = '';
productionCompanies:any;
productionCountries:string = '';
currentId:any;
movieCast:any;
movieCrew:any;
gridview = false

link:string = 'https://www.youtube.com/embed/qEVUtrk8_B4'
allTrailers:any;
constructor(private tmdbService:TmdbService, private ac:ActivatedRoute){
  window.scrollTo(0, 0);
  this.ac.params.subscribe((param:any)=>{
    this.currentId = param.id;
    this.resetValues();
    this.ngOnInit();
    this.ngAfterViewInit()
  })
}
resetValues(){
  this.mymovie = null;
  this.allMovies = null;
  this.movieGenre = '';
  this.movieBackdropImages = null;
  this.moviePosterImages = null;
  this.availableLanguages = '';
  this.productionCompanies = null;
  this.productionCountries = '';
  this.movieCast = null
  this.movieCrew = null
  this.gridview = true
  this.backdrop = ''
  this.allVideos = null;
  this.mainTrailer = null;
  this.recommend = null;
  this.recommendPage = 0
  this.recommendMov = []
  this.similar = null;
  this.similarPage = 0
  this.similarMov = []
}
backdrop = ''
ngAfterViewInit(): void {
  
  this.getVideo(this.currentId)
}
ngOnInit(): void {
  this.getMovieDetails(this.currentId);
  this.getMovieImages(this.currentId);
  this.movieCredits();
  this.similarMovies();
  this.recommendedMovies();
  this.getMovieKeywords();
}

// Get Complete Movie Details
getMovieDetails(currentMovie:any){
  this.tmdbService.getTMDBData(`movie/${currentMovie}`).subscribe((movieDetails:any)=>{
    this.mymovie = movieDetails;
    this.backdrop = movieDetails.backdrop_path
    document.title = `${movieDetails.title} - Movie`
    this.productionCompanies = movieDetails.production_companies;
    movieDetails.production_countries.forEach((country:any) => {
      this.productionCountries = this.productionCountries + ", "+ country.name;
    });;
    ///Spoken Languages
    this.mymovie.spoken_languages.forEach((language:any) => {
      this.availableLanguages = this.availableLanguages + ", "+ language.english_name;
    });
    this.getMovieGenre();
    // console.log(movieDetails);
  })
}

// Get Current Movie Images
getMovieImages(currentMovie:any){
  this.tmdbService.getTMDBData(`movie/${currentMovie}/images`).subscribe((images:any)=>{
    // console.log(images);
    this.movieBackdropImages = images.backdrops
    this.moviePosterImages = images.posters;

    let x = 1;
    if (this.movieBackdropImages.length>1) {
      setInterval(()=>{
        if (x< this.movieBackdropImages.length - 1) {
          this.backdrop = this.movieBackdropImages[x].file_path
          x++
        }else{
          x = 0
          this.backdrop = this.movieBackdropImages[x].file_path
        }
      }, 10000)
    }
    
  })
}
movieCredits(){
  this.tmdbService.getTMDBData(`movie/${this.currentId}/credits`).subscribe((res:any)=>{
    // console.log(res);
    this.movieCast = res.cast;
    this.movieCrew = [...new Set(res.crew)]
    // this.movieCrew = res.crew
  })
}

allKeywords:any[] = [];
getMovieKeywords(){
  this.tmdbService.getTMDBData(`movie/${this.currentId}/keywords`).subscribe((res:any)=>{
    console.log(res);
    this.allKeywords = res.keywords;
  })
}
allVideos:any;
mainTrailer:any
getVideo(movieId:any){
  this.tmdbService.getTMDBData(`movie/${movieId}`).subscribe((res:any)=>{
    let trailers = res.results;
    console.log(res);
    
    // console.log(trailers);
    this.allVideos = trailers
    setTimeout(() => {
    let iframe = document.getElementById('myiframe') as HTMLIFrameElement;
    trailers.forEach((trailer:any) => {
      if (trailer.type === 'Trailer') {
        this.mainTrailer = trailer;
      }else{
        this.mainTrailer = trailer
      }
    })
    // alert(iframe.src)
    iframe.src = 'https://www.youtube.com/embed/'+this.mainTrailer.key;
    }, 3000);
  })
}
playVideo(video:object){
  // console.log(video);
  this.mainTrailer = video;
  let defaultSrc = 'https://www.youtube.com/embed/'
  let iframe = document.getElementById('myiframe') as HTMLIFrameElement;
  // window.scrollTo(iframe,'')
  iframe.src = defaultSrc+this.mainTrailer.key;
  let videoTrailer = document.getElementById("videoTrailer") as HTMLDivElement;
  videoTrailer.scrollIntoView(true)
}

//Get Movie Genre Details
getMovieGenre(){
  this.tmdbService.getTMDBData(`genre/movie/list`).subscribe((res:any)=>{
    let generics = res.genres;
    generics.forEach((genre:any) => {
      this.mymovie.genres.forEach((val:any) => {
        if (genre.id == val.id) {
          this.movieGenre = this.movieGenre + ", "+ genre.name;
        }
      });
    });
  })
}
similarMov:any[]=[];
similar:any;
similarPage = 0;
similarMovies(){
  this.similarPage++;
  this.tmdbService.getTMDBData(`movie/${this.currentId}/similar`).subscribe((res:any)=>{
    this.similar = res;
    // console.log(res);
    
    res.results.forEach((movie:any) => {
      this.similarMov.push(movie)
    });
    
  })
}
recommendMov:any[]=[];
recommend:any;
recommendPage = 0;
recommendedMovies(){
  this.recommendPage++;
  this.tmdbService.getTMDBData(`movie/${this.currentId}/recommendations`).subscribe((res:any)=>{
    this.recommend = res;
    // console.log(res);
    
    res.results.forEach((movie:any) => {
      this.recommendMov.push(movie)
    });
    
  })
}
scroller(inc:boolean){
  let cont = document.querySelector('.cast') as HTMLDivElement
  if (inc) {
    cont.scrollTo({left:cont.scrollLeft+800,top:0,behavior:'smooth'})
  }else{
    cont.scrollTo({left:cont.scrollLeft-800,top:0,behavior:'smooth'})
  }
}
scroller2(inc:boolean){
  let cont = document.querySelector('.crew') as HTMLDivElement
  if (inc) {
    cont.scrollTo({left:cont.scrollLeft+800,top:0,behavior:'smooth'})
  }else{
    cont.scrollTo({left:cont.scrollLeft-800,top:0,behavior:'smooth'})
  }
}