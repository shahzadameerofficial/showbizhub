import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss'
})
export class SwitcherComponent implements AfterViewInit{
  @Input() data:any = []
  @Input() routes:any = [];
  @Input() active:number | undefined;

  @Output() newItemEvent = new EventEmitter<any>();
  constructor(private activatedRoute:ActivatedRoute){
  }
  
  itemWidth:any = ''
  ngAfterViewInit(): void {
    // console.log(this.movingBG.nativeElement.previousElementSibling.style.width);
    if (this.active) {
      this.currentTab = this.active
      this.itemWidth = this.movingBG.nativeElement.style.width
      
      this.left = this.active * + 100;
      this.movingBG.nativeElement.style.left = `${this.left}px`
    }
  }
  @ViewChild('movingbg') 'movingBG': ElementRef<any>;
  // @ViewChild('movingbg') 'movingBG': ElementRef<HTMLSpanElement>;
  left: any = 0;
  currentTab: number = 0;
  activeTab(tab: any, index: any) {
    this.left = index * 100;
    // this.itemWidth = this.movingBG.nativeElement.style.width
    setTimeout(() => {
      this.currentTab = index;
    }, 300);
    this.movingBG.nativeElement.style.left = `${this.left}px`
    this.newItemEvent.emit({ tab, index })
  }
}
