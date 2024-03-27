import { Component } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { TabViewModule } from 'primeng/tabview';
import { CustomBedgeComponent } from '../../../components/custom-bedge/custom-bedge.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";
import { TopTitlesComponent } from "../../../components/top-titles/top-titles.component";

@Component({
    selector: 'app-favorites',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
    imports: [TabViewModule, CustomBedgeComponent, InfiniteScrollModule, CardsContainerComponent, TopTitlesComponent]
})
export class FavoritesComponent {
  data:any
  constructor(private firestoreService:FirestoreService) {
    this.getData()
    setTimeout(() => {
      console.log(this.data);
      
    }, 5000);
  }
  getData(){
    this.data = this.firestoreService.getList()
  }
}
