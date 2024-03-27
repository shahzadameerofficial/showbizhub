import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { MovieVideo } from '../../interface/movie-videos.interface';
import { ImgComponent } from "../common/img/img.component";



@Component({
    selector: 'app-media-gallery',
    standalone: true,
    templateUrl: './media-gallery.component.html',
    styleUrl: './media-gallery.component.scss',
    imports: [GalleriaModule, ButtonModule, CommonModule, LightgalleryModule, ImgComponent]
})
export class MediaGalleryComponent {
  @Input() images: any[] | undefined = undefined;
  @Input() videos: MovieVideo[] | undefined = undefined;
  @Input() thumbnailKey: string | any;
  @Input() defaultTile: string | any = '';
  @Input() type: string | any;
  @ViewChild('myiframe') 'player': ElementRef<HTMLIFrameElement>;
  viewType:string = 'grid'
  // @ViewChild('movingbg') 'movingBG': ElementRef<HTMLSpanElement>;
  url = signal('http://image.tmdb.org/t/p/w300')
  urlorig: string = 'http://image.tmdb.org/t/p/w300'
  previewUrl: string = 'http://image.tmdb.org/t/p/original';
  checkvideo(){}
  thumbnailUrl: string = 'https://i.ytimg.com/vi/'
  constructor() {
  }
  youtubeEmbedUrl = 'https://www.youtube.com/watch?v=';
  settings = {
    counter: false,
    plugins: [lgZoom],
};
settings2 = {
    counter: false,
    plugins: [lgVideo],
};
  activeIndex: number = 0;
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayBasic = true;
  }
  currentVideo:string = ''
  playVideo(index:number, key:string){
    const youtubeEmbedUrl = 'https://www.youtube.com/embed/';
    const iframe = document.getElementById('iframePlayer') as HTMLIFrameElement
    this.activeIndex = index
    this.displayBasic = true;
    this.currentVideo = key
    setTimeout(() => {
      iframe.src = youtubeEmbedUrl + key
    }, 3000);
    
  }
  displayBasic: boolean | any;


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

}
