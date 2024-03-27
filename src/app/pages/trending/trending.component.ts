import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { SwitcherComponent } from "../../components/switcher/switcher.component";
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";
import { TmdbService } from '../../services/tmdb.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-trending',
    standalone: true,
    templateUrl: './trending.component.html',
    styleUrl: './trending.component.scss',
    imports: [RouterModule, DropdownModule, SwitcherComponent, TopTitlesComponent, ReactiveFormsModule, RadioButtonModule]
})
export class TrendingComponent {
    activeTab:number = 0
    constructor(private tmdbService:TmdbService, private router:Router){
        router.events.subscribe(
            (val:any)=>{
                if(val.urlAfterRedirects){
                    const url = val.urlAfterRedirects.slice(10, val.urlAfterRedirects.length - 1);
                    if (url == 'tvshow') {
                        this.activeTab = 2
                    }else if(url == 'movie'){
                        this.activeTab = 1
                    }else if(url == 'celebritie'){
                        this.activeTab = 3
                    }
                }
            }
        )
    }

    timeWindowForm:FormGroup = new FormGroup({
        timewindow: new FormControl('day')
    })
    updateTimeWindow(){
        console.log(this.timeWindowForm.value);
        
        const currentTimeWindow: string = this.timeWindowForm.value.timewindow
        this.tmdbService.timeWindow.set(currentTimeWindow)
    }
}
