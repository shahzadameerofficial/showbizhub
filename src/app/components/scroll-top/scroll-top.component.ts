import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss'
})
export class ScrollTopComponent {
  visibility:'hidden' | 'visible' = 'hidden';
  constructor(){
    window.onscroll = ()=>{
      if (window.scrollY > 700) {
        this.visibility = 'visible';
      }else{
        this.visibility = 'hidden'
      }
    }
  }
  scrollToTop(){
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    })
  }
}
