// Movieslist from API
export interface MoviesResultsListFromApi {
  page: number;
  results: MovieObjectFromApi[];
  total_pages: number;
  total_results: number;
}

// Movie object from API
export interface MovieObjectFromApi {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

// Movie object with updated properties
// export interface Movie {
//   id: number;
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: false;
//   vote_average: number;
//   vote_count: number;
//   isFavourite: boolean; //new
//   onWatchList: boolean; // new
// }

export interface Movie extends MovieObjectFromApi {
  isFavourite: boolean;
  isInWatchList: boolean;
}
