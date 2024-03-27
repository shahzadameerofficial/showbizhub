export interface Celebrity {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday?: any;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
export interface ExternalIDs {
  id: number;
  freebase_mid: string;
  freebase_id?: any;
  imdb_id: string;
  tvrage_id?: any;
  wikidata_id: string;
  facebook_id?: any;
  instagram_id: string;
  tiktok_id?: any;
  twitter_id?: any;
  youtube_id?: any;
}