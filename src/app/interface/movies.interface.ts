export interface Movies {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  isFavorite?:boolean | any;
  release_date: string;
  job?: string;
  character?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface Dates {
  maximum: string;
  minimum: string;
}