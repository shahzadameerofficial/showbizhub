export interface storedUser {
    user: User;
    data: Data;
  }
  
export interface Data {
    include_adult: boolean;
    email: string;
    dateOfBirth: string;
    data_saving_mode: boolean;
    dark_mode: boolean;
    username: string;
    region: Region;
    data_saving_type?: any;
    language: Language;
    accentColor: string;
  }
  
export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
export interface Region {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
  }
  
export interface User {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
  }