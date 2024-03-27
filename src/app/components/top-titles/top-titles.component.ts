
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-titles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss'
})
export class TopTitlesComponent {
@Input() label:string | any
@Input() showAs: 'flex' | 'column' = 'flex'
}
