
export interface VideoDataProps  {
  id: number;
  title: string;
  poster_path: string;
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
  poster_path?: number;
  release_date?: string;
  tagline?: string;
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

