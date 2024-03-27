import { Component, Input, input } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';


import {RoundProgressComponent} from 'angular-svg-round-progressbar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-circle-rating',
  standalone: true,
  imports: [RoundProgressComponent, CommonModule],
  templateUrl: './circle-rating.component.html',
  styleUrl: './circle-rating.component.scss'
})
export class CircleRatingComponent {
@Input() max:number |undefined = undefined
@Input() radius:number |undefined = undefined
@Input() stroke:number |undefined = undefined
@Input() current:any |undefined = undefined;
rating:any = parseInt(this.current)
}
