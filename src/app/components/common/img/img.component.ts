import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule, LoadingBarHttpClientModule, LoadingBarModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent {
  @Input() src: string = '';
  @Input() class: string = '';
  @Input() ngClass: string = '';
  @Input() style: string = '';
  @Input() ngStyle: string = '';
  @Input() loading: 'eager' | 'lazy' = 'lazy';
  @Input() alt: string = '';
  @Input() title: string = '';
  @Input() onLoad: any
  @Input() onError: any


  imageLoaded: boolean = false
  loadImage() {
    this.imageLoaded = true
  }
  altText:string | undefined
  checkError(){
    this.imageLoaded = true;
    this.altText = 'Failed to Load Image!'
  }
}
