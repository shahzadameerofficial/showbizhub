import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { TvshowCardComponent } from "../../../components/cards/tvshow-card/tvshow-card.component";
import { TVShow } from '../../../interface/tvshow-details.interface';
import { CustomTagComponent } from "../../../components/custom-tag/custom-tag.component";
import { CarouselModule } from 'primeng/carousel';
import { MiniCelebrityCardComponent } from "../../../components/cards/mini-celebrity-card/mini-celebrity-card.component";
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";
import { CustomBedgeComponent } from "../../../components/custom-bedge/custom-bedge.component";
import { TabViewModule } from 'primeng/tabview';
import { MediaGalleryComponent } from "../../../components/media-gallery/media-gallery.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieCardComponent } from "../../../components/cards/movie-card/movie-card.component";
import { CircleRatingComponent } from "../../../components/circle-rating/circle-rating.component";
import { ButtonModule } from 'primeng/button';
import { MovieVideo } from '../../../interface/movie-videos.interface';
import { LightgalleryModule } from 'lightgallery/angular';
import lgVideo from 'lightgallery/plugins/video';
import { DetailsLineComponent } from "../../../components/details-line/details-line.component";
import { PageLoaderComponent } from "../../../components/page-loader/page-loader.component";

@Component({
    selector: 'app-tvshow',
    standalone: true,
    templateUrl: './tvshow.component.html',
    styleUrl: './tvshow.component.scss',
    imports: [CommonModule, RouterModule, TvshowCardComponent, CustomTagComponent, CarouselModule, MiniCelebrityCardComponent, CardsContainerComponent, CustomBedgeComponent, TabViewModule, MediaGalleryComponent, InfiniteScrollModule, MovieCardComponent, CircleRatingComponent, ButtonModule, LightgalleryModule, DetailsLineComponent, ButtonModule, PageLoaderComponent]
})
export class TvshowComponent {

  currentId: any;
  tvshow: TVShow | undefined;
  seriesImages: any;
  tvShowVideos: any;
  isLoading:boolean = true
  imageUrl: string = 'https://image.tmdb.org/t/p/original'

  constructor(private ac: ActivatedRoute, private tmdbService: TmdbService) {
    this.ac.params.subscribe((res: any) => {
      window.scrollTo(0,0)
      this.currentId = res.id;
      this.getDetails();
      this.getKeywords();
      this.getCredits();
      this.getImages();
      this.getVideos()
      this.getSimilarShows();
      this.getRecommendedShows()
    })
  }

  getSimilarShows() {
    this.tmdbService.getTMDBData(`tv/${this.currentId}/similar`).subscribe((res: any) => {
      console.log(res);
      this.similar = res
    })
  }
  getRecommendedShows() {
    this.tmdbService.getTMDBData(`tv/${this.currentId}/recommendations`).subscribe((res: any) => {
      // console.log(res);
      this.recommended = res
    })
  }

  getDetails() {
    this.isLoading = true
    this.tvshow = undefined
    this.tmdbService.getTMDBData(`tv/${this.currentId}`).subscribe((res: any) => {
      console.log(res);
      this.tvshow = res;
      this.isLoading = false
    },()=>{
      this.isLoading = false
    })
  }
  keywords: any
  getKeywords() {
    this.keywords = undefined
    this.tmdbService.getTMDBData(`tv/${this.currentId}/keywords`).subscribe((res: any) => {
      console.log(res);
      this.keywords = res.results;
    })
  }

  getImages() {
    this.seriesImages = undefined
    this.tmdbService.getTMDBData(`tv/${this.currentId}/images`).subscribe((res: any) => {
      console.log(res);
      this.seriesImages = res
    })
  }
  credits: any
  getCredits() {
    this.credits = undefined
    this.tmdbService.getTMDBData(`tv/${this.currentId}/credits`).subscribe((res: any) => {
      console.log(res);
      this.credits = res
    })
  }
  getVideos() {
    this.tvShowVideos = undefined
    this.tmdbService.getTMDBData(`tv/${this.currentId}/videos`).subscribe((res: any) => {
      this.tvShowVideos = res.results
      console.log(res);
      this.playVideo()
    })
  }
  currentVideo: any;

  VideoSettings = {
    counter: false,
    plugins: [lgVideo],
  };
  playVideo() {
    // console.log(video);
    let defaultSrc = 'https://www.youtube.com/embed/'
    // let iframe = document.getElementById('myiframe') as HTMLIFrameElement;
    this.tvShowVideos?.forEach((video: MovieVideo) => {
      // If Trailer Found
      if (video.type == 'Trailer') {
        this.currentVideo = `${defaultSrc}${video.key}`
        return

        // If Trailer Not Found But Teaser Found
      } else if (video.type != 'Trailer' && video.type == 'Teaser') {
        this.currentVideo = `${defaultSrc}${video.key}`
        return

        // If Trailer & Teaser Both Are Not Present then Look For Featurette Video
      } else if (video.type != 'Trailer' && video.type != 'Teaser' && video.type == 'Featurette') {
        this.currentVideo = `${defaultSrc}${video.key}`
        return

        // If All of them are not present then anyone video will be set to default
      } else {
        this.currentVideo = `${defaultSrc}${video.key}`
        return
      }
    })
  }
  similar: any
  recommended: any
  appendMoreTvShows(endpoint: string, arrayName: string) {
    let currentPage = 1;
    if (arrayName == 'similar' && this.similar.page < 500) {
      currentPage = this.similar.page + 1
    }
    if (arrayName == 'recommended' && this.similar.page < 500) {
      currentPage = this.recommended.page + 1
    }
    if (currentPage > 500) {
      return
    }
    this.tmdbService.getTMDBData(`tv/${this.currentId}/${endpoint}`, {page: currentPage}).subscribe(
      (response: any) => {
        console.log(response);
        if (arrayName == 'similar') {
          this.similar.page = response.page
          this.similar.total_pages = response.total_pages
          this.similar.total_results = response.total_results
          response.results.forEach((movie: any) => {
            this.similar.results.push(movie)
          })
        } else if (arrayName == 'recommended') {
          this.recommended.page = response.page
          this.recommended.total_pages = response.total_pages
          this.recommended.total_results = response.total_results
          response.results.forEach((movie: any) => {
            this.recommended.results.push(movie)
          })
        }

      }
    )
  }
}
