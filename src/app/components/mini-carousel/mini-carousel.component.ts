import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList, AfterContentInit, Input, HostListener } from '@angular/core';
// import * as Hammer from 'hammerjs';
import Hammer from 'hammerjs';
import { MiniCarouselItemComponent } from './mini-carousel-item/mini-carousel-item.component';

interface BreakpointConfig {
  breakpoint: number;
  itemsToShow: number;
  slideStep: number;
  showIndicators: boolean;
}


@Component({
  selector: 'app-mini-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-carousel.component.html',
  styleUrl: './mini-carousel.component.scss'
})
export class MiniCarouselComponent {
  @ContentChildren(MiniCarouselItemComponent) carouselItems!: QueryList<MiniCarouselItemComponent>;
  @Input() breakpoints: BreakpointConfig[] = [{ breakpoint: 0, itemsToShow: 1, slideStep: 1, showIndicators: true }];
  @Input() enableDrag: boolean = false;
  translateX: string = '0px';
  startX: number = 0;
  currentIndex: number = 0;
  currentConfigIndex: number = 0;
  itemsToShow: number = 1;
  slideStep: number = 1;
  showIndicators: boolean = true;

  constructor() { }

  ngAfterContentInit(): void {
    this.carouselItems.changes.subscribe(() => {
      this.currentIndex = 0;
      this.translateX = '0px';
    });
    this.updateConfig();
    if (this.enableDrag) {
      this.initHammer();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateConfig();
  }

  initHammer() {
    const element = document.querySelector('.carousel') as HTMLElement;
    const mc = new Hammer(element);
    mc.on('panstart panmove', (event: any) => this.onPan(event));
  }

  updateConfig() {
    const windowWidth = window.innerWidth;
    let configIndex = this.breakpoints.findIndex(config => windowWidth >= config.breakpoint);
    if (configIndex === -1) {
      configIndex = this.breakpoints.length - 1;
    }
    if (configIndex !== this.currentConfigIndex) {
      this.currentConfigIndex = configIndex;
      const config = this.breakpoints[configIndex];
      this.itemsToShow = config.itemsToShow;
      this.slideStep = config.slideStep;
      this.showIndicators = config.showIndicators;
    }
  }

  onPan(event: any) {
    if (!this.enableDrag) {
      return;
    }
    if (event.type === 'panstart') {
      this.startX = event.center.x;
    } else if (event.type === 'panmove') {
      const deltaX = event.center.x - this.startX;
      const totalItems = this.carouselItems.length;
      const maxIndex = totalItems - this.itemsToShow;
      let newIndex = this.currentIndex + Math.round(deltaX / (window.innerWidth / this.itemsToShow));
      newIndex = Math.min(Math.max(newIndex, 0), maxIndex);
      this.translateX = `${-newIndex * 100 / this.itemsToShow}%`;
    }
  }

  slideTo(index: number) {
    this.currentIndex = index;
    this.translateX = `-${index * 100 / this.itemsToShow}%`;
  }

  slidePrev() {
    this.currentIndex = Math.max(0, this.currentIndex - this.slideStep);
    this.translateX = `-${this.currentIndex * 100 / this.itemsToShow}%`;
  }

  slideNext() {
    const maxIndex = this.carouselItems.length - this.itemsToShow;
    this.currentIndex = Math.min(maxIndex, this.currentIndex + this.slideStep);
    this.translateX = `-${this.currentIndex * 100 / this.itemsToShow}%`;
  }
}
