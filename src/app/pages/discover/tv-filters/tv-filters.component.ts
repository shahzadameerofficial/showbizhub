import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TmdbService } from '../../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-tv-filters',
  standalone: true,
  
  imports: [CalendarModule, ReactiveFormsModule, CommonModule, ButtonModule, DropdownModule, CheckboxModule, MultiSelectModule, AutoCompleteModule, BadgeModule],
  templateUrl: './tv-filters.component.html',
  styleUrl: './tv-filters.component.scss'
})
export class TvFiltersComponent {

  placeholderImage = 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
  allSorts = [
    {name: 'Latest Releases', value: 'first_air_date.desc'},
    {name: 'Older Releases', value: 'first_air_date.asc'},
    {name: 'Name Asc', value: 'name.desc'},
    {name: 'Name Desc', value: 'name.asc'},
    {name: 'Popular', value: 'popularity.desc'},
    {name: 'Less Popular', value: 'popularity.asc'},
    {name: 'Liked', value: 'vote_average.desc'},
    {name: 'Less Liked', value: 'vote_average.asc'}
  ]
  @Output() applyFilters = new EventEmitter<any>();
  constructor(private fb:FormBuilder, private authService:AuthService, private tmdbService:TmdbService){
    this.getMovieGenres();
  }

  filtersForm: FormGroup = this.fb.group({
    sortBy: this.fb.control(this.allSorts[4]),
    withGenres: this.fb.control([]),
    firstAirDateYear: this.fb.control(''),
  })

  submitFilters(){
    console.log(typeof this.filtersForm.value);
    let formValues = this.filtersForm.value;
    let finalValues = this.filtersForm.value
    for (let item of Object.entries(formValues)) {
      // console.log(item);
      
      // for multiple genres
      if(Array.isArray(item[1]) && item[1].length > 0){
        finalValues[item[0]] = item[1].map(obj => obj.id).join(',');
      }
      
      // for sort by and language
      if(typeof item[1] === 'object' && item[1] !== null){
        const value = Object.values(item[1])
        if (item[0] === 'sortBy') {
          finalValues[item[0]] = value[1]
        }
        if (item[0] === 'language' || item[0] === 'region') {
          finalValues[item[0]] = value[0]
        }
        if (item[0] === 'firstAirDateYear') {
          finalValues[item[0]] = formValues.firstAirDateYear.getFullYear()
        }
        
        // console.log(item[0]);
        

      }
    }
    // console.log(finalValues);
    
    this.applyFilters.emit(finalValues)
  }
  allGenres:any = []
  getMovieGenres(){
    this.tmdbService.getTMDBData(`genre/tv/list`).subscribe(
      (res:any)=>{
        // console.log(res);
        this.allGenres = res.genres
      }
    )
  }
  allLanguages:any[] = []
  getLanguages(){
    this.tmdbService.getTMDBData(`configuration/languages`).subscribe(
      (res:any)=>{
        // console.log(res);
        this.allLanguages = res
      }
    )
  }
  allRegions:any[] = []
  getRegions(){
    this.tmdbService.getTMDBData(`configuration/countries`).subscribe(
      (res:any)=>{
        this.allRegions = res
      }
    )
  }
  
  allCelebrities: any[] = []
  getCelebrities(query: string){
    this.tmdbService.getTMDBData(`search/person`,{query}).subscribe(
      (res:any)=>{
        this.allCelebrities = res.results
        console.log(res);
        
      }
    )
  }
  filterCountry(e:any){
    this.getCelebrities(e.query)
  }
  selectCelebrity(){
    alert('abc');
    
  }
}
