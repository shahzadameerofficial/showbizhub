import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent {
 @Input() loading:boolean = false;
 @Input() placeholder:boolean = true;
 @Input() message:string | undefined
}
