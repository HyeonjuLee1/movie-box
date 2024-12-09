
export interface MovieItemProps  {
  id:number;
  adult:boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?:string;
  original_title?:string;
  overview?:string;
  poster_path?: string;
  release_date?: string;
  title?:string;
  video?: number;
  vote_average?: number;
}

export interface TvShowItemProps  {
  id:number;
  adult:boolean;                                                      
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?:string;
  original_name?:string;
  overview?:string;
  poster_path?: string;
  name?:string;
  vote_average?: number;
}

export interface GenreProps  {
  id: number;
  name: string;
}

export interface ProductionCountriesProps  {
  iso_3166_1: string;
  name: string;
}

export interface MovieInfoProps  {
  id:number;
  adult:boolean;
  backdrop_path?: string;
  budget?:number;
  genres?: GenreProps[];
  original_title?:string;
  title?:string;
  overview?:string;
  runtime?: number;
  poster_path?: string;
  release_date?: string;
  tagline?: string;
  vote_average?: number;
  production_countries?: ProductionCountriesProps[];
}

export interface TvShowInfoProps  {
  id:number;
  adult:boolean;
  backdrop_path?: string;
  genres?: GenreProps[];
  original_name?:string;
  name?:string;
  overview?:string;
  poster_path?: string;
  vote_average?: number;
  production_countries?: ProductionCountriesProps[];
}

export interface TrailerResultProps  {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official:boolean;
  published_at:string;
  site:string
  type:string
}

export interface TrailerProps  {
  id: number;
  results: TrailerResultProps[];
}

export interface CastProps  {
  id: number;
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface CrewProps  {
  id: number;
  adult: boolean;
  credit_id: string ;
  department: string;
  gender: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface CrewDataProps  {
  id: number;
  cast: CastProps[];
  crew: CrewProps[];
}

export interface MovieBackdropsPostersListProps  {
  aspect_ratio:number;
  file_path: string;
  height: number;
  iso_639_1?: string|null;
  vote_average: number;
  vote_count: string;
  width: number;
}

