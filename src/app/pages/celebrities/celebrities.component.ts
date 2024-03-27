import { Component } from '@angular/core';
import { CardsContainerComponent } from "../../components/cards-container/cards-container.component";
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";

@Component({
    selector: 'app-celebrities',
    standalone: true,
    templateUrl: './celebrities.component.html',
    styleUrl: './celebrities.component.scss',
    imports: [CardsContainerComponent, TopTitlesComponent]
})
export class CelebritiesComponent{

  constructor() {}


}
