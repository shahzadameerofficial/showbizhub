import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

}
