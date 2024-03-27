import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cast, Crew } from '../../../interface/movie-credits.interface';
// import { BadgeModule } from 'primeng/badge';
// import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-mini-celebrity-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mini-celebrity-card.component.html',
  styleUrl: './mini-celebrity-card.component.scss'
})
export class MiniCelebrityCardComponent {
  @Input() allCast:any;
  @Input() allCrew:any;
  @Input() cast:Cast | undefined;
  @Input() crew:Crew | undefined;
  @Input() routerLink:any;


  url = 'http://image.tmdb.org/t/p/w154';
  placeholder = 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
}
