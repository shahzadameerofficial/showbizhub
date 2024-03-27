import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SwitcherComponent } from "../../components/switcher/switcher.component";
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [RouterModule, SwitcherComponent, CommonModule, TopTitlesComponent]
})
export class SearchComponent {
    currentSearchQuery:any = ''
    constructor(private tmdbService:TmdbService, private ac:ActivatedRoute) {
        this.ac.params.subscribe(
            (res:any)=>{
                if(res.query){
                    this.tmdbService.setState({searchQuery: res.query})
                }
            }
        )
        this.currentSearchQuery = this.tmdbService.select('searchQuery')
        this.tmdbService.setState({age: '26'});
        setTimeout(() => {
            
        let a = this.tmdbService.select('searchQuery')
        let b = this.tmdbService.select('age')
        // console.log(a());
        // console.log(b());
        }, 3000);
        
    }
}
