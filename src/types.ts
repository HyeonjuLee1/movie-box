
export interface VideoDataProps  {
  id: number;
  title: string;
  poster_path: string;
}

export interface genreProps  {
  id: number;
  name: string;
}

export interface MovieInfoProps  {
  id:number;
  adult:boolean;
  backdrop_path?: string;
  budget?:number;
  genres?: genreProps[];
  original_title?:string;
  title?:string;
  overview?:string;
  runtime?: number;
  poster_path?: number;
  release_date?: string;
  tagline?: string;
  vote_average?: string;
}