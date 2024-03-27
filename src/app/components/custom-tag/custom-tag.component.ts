import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-tag',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './custom-tag.component.html',
  styleUrl: './custom-tag.component.scss'
})
export class CustomTagComponent {
  @Input() severity:string = ''
  @Input() size:string = ''
  @Input() routerLink:string | undefined
  @Input() queryParams:any
  
}
