import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { MovieCardComponent } from "../../components/cards/movie-card/movie-card.component";
import { TvshowCardComponent } from "../../components/cards/tvshow-card/tvshow-card.component";
import { SwitcherComponent } from "../../components/switcher/switcher.component";
import { MovieFiltersComponent } from "./movie-filters/movie-filters.component";
import { MovieFilters } from '../../components/interfaces/movie-filters.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TvFiltersComponent } from "./tv-filters/tv-filters.component";
import { TvFilters } from '../../components/interfaces/tv-filters.interface';
import { CardsContainerComponent } from "../../components/cards-container/cards-container.component";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TopTitlesComponent } from "../../components/top-titles/top-titles.component";
import { Movies } from '../../interface/movies.interface';
import { TVShows } from '../../interface/tvshows.interface';

@Component({
  selector: 'app-discover',
  standalone: true,
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
  imports: [MovieCardComponent, TvshowCardComponent, SwitcherComponent, MovieFiltersComponent, InfiniteScrollModule, TvFiltersComponent, CardsContainerComponent, TopTitlesComponent]
})
export class DiscoverComponent implements OnInit {
  activeTab: number = 0
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
        if (!queryParams.mediaType) {
          this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { mediaType: this.mediaType }, queryParamsHandling: 'merge' });
        } else {
          this.mediaType = queryParams.mediaType

          if (this.mediaType == 'tv') {
            this.applyTvFilter(queryParams)
            this.activeTab = 1
          } else {
            this.applyFilters(queryParams)

          }
        }
      }
    )
  }
  ngOnInit(): void {
  }
  mediaType: string = 'movie';
  mediaTypes: string[] = ['movies', 'tv shows']
  updateMediaType(e: any) {
    if (e.index === 1) {
      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { mediaType: 'tv' }, queryParamsHandling: 'merge' })
      this.mediaType = 'tv';
    } else {
      this.mediaType = 'movie';

      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { mediaType: 'movie' }, queryParamsHandling: 'merge' })
    }
  }
  applyFilters(e: MovieFilters) {
    let filters = [
      {
        paramName: 'certification',
        value: e.certification,
      },
      {
        paramName: 'certification.gte',
        value: e.certificationGte,
      },
      {
        paramName: 'certification.lte',
        value: e.certificationLte,
      },
      {
        paramName: 'certification_country',
        value: e.certificationCountry,
      },
      {
        paramName: 'include_adult',
        value: false,
      },
      {
        paramName: 'include_video',
        value: e.includeVideo,
      },
      {
        paramName: 'language',
        value: e.language,
      },
      {
        paramName: 'primary_release_year',
        value: e.primaryReleaseYear,
      },
      {
        paramName: 'primary_release_date.gte',
        value: e.primaryReleaseYearGte,
      },
      {
        paramName: 'primary_release_date.lte',
        value: e.primaryReleaseYearLte,
      },
      {
        paramName: 'region',
        value: e.region,
      },
      {
        paramName: 'release_date.gte',
        value: e.releaseDateGte,
      },
      {
        paramName: 'release_date.lte',
        value: e.releaseDateLte,
      },
      {
        paramName: 'sort_by',
        value: e.sortBy,
      },
      {
        paramName: 'vote_average.gte',
        value: e.voteAverageGte,
      },
      {
        paramName: 'vote_average.lte',
        value: e.voteAverageLte,
      },
      {
        paramName: 'vote_count.gte',
        value: e.voteCountGte,
      },
      {
        paramName: 'vote_count.lte',
        value: e.voteCountLte,
      },
      {
        paramName: 'watch_region',
        value: e.watchRegion,
      },
      {
        paramName: 'with_cast',
        value: e.withCast,
      },
      {
        paramName: 'with_companies',
        value: e.withCompanies,
      },
      {
        paramName: 'with_crew',
        value: e.withCrew,
      },
      {
        paramName: 'with_genres',
        value: e.withGenres,
      },
      {
        paramName: 'with_keywords',
        value: e.withKeywords,
      },
      {
        paramName: 'with_origin_country',
        value: e.withOriginCountry,
      },
      {
        paramName: 'with_original_language',
        value: e.withOriginLanguage,
      },
      {
        paramName: 'with_people',
        value: e.withPeople,
      },
      {
        paramName: 'with_release_type',
        value: e.withReleaseType,
      },
      {
        paramName: 'with_runtime.gte',
        value: e.withRuntimeGte,
      },
      {
        paramName: 'with_runtime.lte',
        value: e.withRuntimeLte,
      },
      {
        paramName: 'with_watch_monetization_types',
        value: e.withWatchMonetizationTypes,
      },
      {
        paramName: 'without_genres',
        value: e.withoutGenres,
      },
      {
        paramName: 'without_keywords',
        value: e.withoutKeywords,
      },
      {
        paramName: 'with_watch_providers',
        value: e.withWatchProviders,
      },
      {
        paramName: 'without_companies',
        value: e.withoutCompanies,
      },
      {
        paramName: 'without_watch_providers',
        value: e.withoutWatchProviders,
      },
      {
        paramName: 'year',
        value: e.year,
      },
    ];
    let response: any = {};
    filters.forEach(filter => {
      if (filter.value !== undefined) {
        let key: any = filter.paramName.split('.').pop();
        response[key] = filter.value;
      }
    });
    this.appliedFilters = response

  }
  applyTvFilter(tvFilter: TvFilters) {
    let filters = [
      {
        paramName: 'air_date.gte',
        value: tvFilter.airDateGte,
      },
      {
        paramName: 'air_date.gte',
        value: tvFilter.airDateLte,
      },
      {
        paramName: 'first_air_date_year',
        value: tvFilter.firstAirDateYear,
      },
      {
        paramName: 'first_air_date.gte',
        value: tvFilter.firstAirDateGte,
      },
      {
        paramName: 'first_air_date.lte',
        value: tvFilter.firstAirDateLte,
      },
      {
        paramName: 'include_adult',
        value: false,
      },
      {
        paramName: 'language',
        value: tvFilter.language,
      },
      {
        paramName: 'screened_theatrically',
        value: tvFilter.screenedThreatrically,
      },
      {
        paramName: 'sort_by',
        value: tvFilter.sortBy,
      },
      {
        paramName: 'timezone',
        value: tvFilter.timezone,
      },
      {
        paramName: 'vote_average.gte',
        value: tvFilter.voteAverageGte,
      },
      {
        paramName: 'vote_average.lte',
        value: tvFilter.voteAverageLte,
      },
      {
        paramName: 'vote_count.gte',
        value: tvFilter.voteCountGte,
      },
      {
        paramName: 'vote_count.lte',
        value: tvFilter.voteCountLte,
      },
      {
        paramName: 'watch_region',
        value: tvFilter.watchRegion,
      },
      {
        paramName: 'with_companies',
        value: tvFilter.withCompanies,
      },
      {
        paramName: 'with_genres',
        value: tvFilter.withGenres,
      },
      {
        paramName: 'with_keywords',
        value: tvFilter.withKeywords,
      },
      {
        paramName: 'with_networks',
        value: tvFilter.withNetworks,
      },
      {
        paramName: 'with_origin_country',
        value: tvFilter.withOriginCountry,
      },
      {
        paramName: 'with_original_language',
        value: tvFilter.withOriginalLanguage,
      },
      {
        paramName: 'with_runtime.gte',
        value: tvFilter.withRuntimeGte,
      },
      {
        paramName: 'with_runtime.lte',
        value: tvFilter.withRuntimeLte,
      },
      {
        paramName: 'with_status',
        value: tvFilter.withStatus,
      },
      {
        paramName: 'with_watch_monetization_types',
        value: tvFilter.withWatchMonetizationTypes,
      },
      {
        paramName: 'with_watch_providers',
        value: tvFilter.withWatchProviders,
      },
      {
        paramName: 'without_companies',
        value: tvFilter.withoutCompanies,
      },
      {
        paramName: 'without_genres',
        value: tvFilter.withoutGenres,
      },
      {
        paramName: 'without_keywords',
        value: tvFilter.withoutKeywords,
      },
      {
        paramName: 'without_watch_providers',
        value: tvFilter.withoutWatchProviders,
      },
      {
        paramName: 'with_type',
        value: tvFilter.withType,
      },
    ];
    let response: any = {};
    filters.forEach(filter => {
      if (filter.value !== undefined) {
        let key: any = filter.paramName.split('.').pop();
        response[key] = filter.value;
      }
    });
    this.appliedTvFilters = response
  }
  appliedFilters: object = {};
  appliedTvFilters: object = {};
}
