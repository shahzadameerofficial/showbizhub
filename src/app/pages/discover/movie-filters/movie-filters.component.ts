import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../../services/auth.service';
import { TmdbService } from '../../../services/tmdb.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule } from 'primeng/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChipsModule } from 'primeng/chips';


@Component({
  selector: 'app-movie-filters',
  standalone: true,
  templateUrl: './movie-filters.component.html',
  styleUrl: './movie-filters.component.scss',
  imports: [CalendarModule, ReactiveFormsModule, CommonModule, ButtonModule, DropdownModule, MultiSelectModule, AutoCompleteModule, BadgeModule, MatButtonModule, MatToolbarModule, ChipsModule]
})
export class MovieFiltersComponent{
  placeholderImage = 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
  allSorts = [
    { name: 'Latest First', value: 'primary_release_date.desc' },
    { name: 'Older First', value: 'primary_release_date.asc' },
    { name: 'Popular First', value: 'popularity.desc' },
    { name: 'UnPopular First', value: 'popularity.asc' },
    { name: 'More Revenue', value: 'revenue.desc' },
    { name: 'Less Revenue', value: 'revenue.asc' },
    { name: 'More Rating Desc', value: 'vote_average.desc' },
    { name: 'Less Rating', value: 'vote_average.asc' },
    { name: 'More Liked', value: 'vote_count.desc' },
    { name: 'Less Liked', value: 'vote_count.asc' },
  ]
  @Output() applyFilters = new EventEmitter<any>();
  @Input() activeFilters:any
  constructor(private fb: FormBuilder, private tmdbService: TmdbService) {
    this.getMovieGenres();
  }
  ngAfterViewInit(): void {
    
    this.filtersForm.valueChanges.subscribe(
      res => {
        this.submitFilters()
      }
    )
  }

  filtersForm: FormGroup = this.fb.group({
    sortBy: this.fb.control(this.allSorts[2]),
    withGenres: this.fb.control(''),
    year: this.fb.control(''),
    withCast: this.fb.control([]),
    withKeywords: this.fb.control([]),
  })

  submitFilters() {
    let formValues = this.filtersForm.value;
    let finalValues = this.filtersForm.value
    for (let item of Object.entries(formValues)) {

      // for multiple genres
      if (Array.isArray(item[1]) && item[1].length > 0) {
        finalValues[item[0]] = item[1].map(obj => obj.id).join(',');
      }

      // for sort by and language
      if (typeof item[1] === 'object' && item[1] !== null) {
        const value = Object.values(item[1])
        if (item[0] === 'sortBy') {
          finalValues[item[0]] = value[1]
        }
        if (item[0] === 'language' || item[0] === 'region') {
          finalValues[item[0]] = value[0]
        }
        if (item[0] === 'year') {
          finalValues[item[0]] = formValues.year.getFullYear()
        }
      }
    }
    this.applyFilters.emit(finalValues)
  }
  allGenres: any = []
  getMovieGenres() {
    this.tmdbService.getTMDBData(`genre/movie/list`).subscribe(
      (res: any) => {
        this.allGenres = res.genres
      }
    )
  }

  allCelebrities: any[] = []
  getCelebrities(query: string) {
    this.tmdbService.getTMDBData(`search/person`, {query}).subscribe(
      (res: any) => {
        this.allCelebrities = res.results
        
      }
    )
  }
  filterByCelebrity(e: any) {
    this.getCelebrities(e.query)
  }

  allKeywords: any[] = []
  filterByKeywords(e: any) {
    this.tmdbService.getTMDBData(`search/keyword`, {query: e.query}).subscribe(
      (res: any) => {
        this.allKeywords = res.results
      }
    )
  }
}
