import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../interface/movies.interface';
import { CustomTagComponent } from "../custom-tag/custom-tag.component";
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RatingPipe } from "../../pipes/rating.pipe";
import { ReleaseDatePipe } from "../../pipes/release-date.pipe";
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  imports: [CarouselModule, CustomTagComponent, RatingModule, FormsModule, RatingPipe, ButtonModule, RouterModule, ReleaseDatePipe]
})
export class HeroSectionComponent implements OnChanges {
  @ViewChild('herosection') 'herosection': ElementRef<HTMLDivElement>
  @Input() movies: Movie[] = [];
  carouselConfig = {
    showSlide: 1
  }
  backdropUrl: string = 'http://image.tmdb.org/t/p/w1280'
  posterUrl: string = 'http://image.tmdb.org/t/p/w342'

  currentIndex: number = 0
  constructor(private tmdbService: TmdbService) {
    let config = this.tmdbService.getSavingMode();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.movies.length > 0) {
      let mc = new Hammer(this.herosection.nativeElement)
      
      mc.on('swipeleft swiperight', (event: any) => {
        if (event.type == 'swipeleft') {
          this.switchMovie(1)
        } else {
          this.switchMovie(-1)
        }
      })
    }
  }
  updatePage(e: any) {
    this.currentIndex = e.page
  }
  switchMovie(change: number) {
    if (change === 1) {
      if (this.currentIndex < this.movies.length - 1) {
        this.currentIndex = this.currentIndex + change
      } else {
        this.currentIndex = 0
      }
    } else if (change === -1) {
      if (this.currentIndex != 0) {
        this.currentIndex = this.currentIndex + change
      } else {
        this.currentIndex = this.movies.length - 1
      }
    }
  }
}