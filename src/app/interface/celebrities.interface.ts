export interface Celebrities {
  page: number;
  results: Celebrity[];
  total_pages: number;
  total_results: number;
}

export interface Celebrity {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  isFavorite?: any,
  known_for: Knownfor[];
}

interface Knownfor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string;
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}
