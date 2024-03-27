import { Component } from '@angular/core';
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: [TopTitlesComponent, RouterModule, CommonModule]
})
export class AboutComponent {

}
