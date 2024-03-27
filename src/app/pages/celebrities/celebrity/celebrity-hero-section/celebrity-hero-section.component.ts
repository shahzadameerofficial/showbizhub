import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-celebrity-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './celebrity-hero-section.component.html',
  styleUrl: './celebrity-hero-section.component.scss'
})
export class CelebrityHeroSectionComponent implements OnChanges {
  @ViewChild('cherosection') 'herosection':ElementRef<HTMLDivElement>
  @Input() credits:any;
  imageUrl:string = 'http://image.tmdb.org/t/p/original';
  filterCredits:any[] = [];
  currentIndex: number = 0;
  constructor(){
  }
  ngOnChanges(): void {
    if (this.credits?.length > 0) {
      this.credits.forEach((credit:any) => {
        if (credit.backdrop_path) {
          this.filterCredits.push(credit)
        }
      });
      let mc = new Hammer(this.herosection.nativeElement)
      mc.on('swipeleft swiperight', (event:any)=>{
        if(event.type == 'swipeleft'){
          this.switchCredit(1)
        }else{
          this.switchCredit(-1)
        }
      })
      setInterval(() => {
        this.switchCredit(1)
      }, 10000);
    }
  }
  switchCredit(change:number){
    if(change === 1){
      if (this.currentIndex < this.filterCredits.length - 1) {
        this.currentIndex = this.currentIndex + change
      }else{
        this.currentIndex = 0
      }
    }else if(change === -1){
      if (this.currentIndex != 0) {
        this.currentIndex = this.currentIndex + change
      }else{
        this.currentIndex = this.filterCredits.length - 1
      }
    }
    // if (this.currentIndex < this.filterCredits.length - 1 && change == 1) {
    //   this.currentIndex++
    // }else if(this.currentIndex == this.filterCredits.length - 1 && change == 1){
    //   this.currentIndex = 1
    // }else if(this.currentIndex < this.filterCredits.length - 1 && change == -1){
    //   this.currentIndex--
    // }else {
    //   this.currentIndex  = this.filterCredits.length - 1
    // }
  }
}
