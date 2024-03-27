import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-line',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details-line.component.html',
  styleUrl: './details-line.component.scss'
})
export class DetailsLineComponent {
  @Input() label:string | undefined
  @Input() src:string | undefined;
  @Input() routerLink:any;
  @Input() queryParams:any;
  logoPath:string = 'http://image.tmdb.org/t/p/w45';
  placeholder:string = '../../../assets/images/logo.png';
}
