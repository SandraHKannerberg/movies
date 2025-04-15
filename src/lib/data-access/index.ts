"use server";

import { Genre, GenresFromApi } from "../interfaces/category-interfaces";
import {
  Movie,
  MoviesResultsListFromApi,
} from "../interfaces/movie-interfaces";

const API_ENDPOINT = "https://api.themoviedb.org/3";

const TOKEN = process.env.ACCESS_TOKEN_AUTH;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export type FetchMoviesOptions = {
  yearFrom?: number;
  yearTo?: number;
  page: number;
  sortBy?: string;
};

export async function fetchMovies({
  yearFrom = new Date().getFullYear(), // Default current year
  yearTo = new Date().getFullYear(), // Default current year
  page,
  sortBy = "popularity.desc", // Default
}: FetchMoviesOptions): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}> {
  try {
    // Fetch data
    const res = await fetch(
      `${API_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31&region=se&sort_by=${sortBy}&with_release_type=2|3&with_original_language=sv|en&with_runtime.gte=70&vote_count.gte=100`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData: MoviesResultsListFromApi = await res.json();

    // TODO: Ta bort när filter är klart
    console.log("RESPONSE", movieData);

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      isInWatchList: Boolean(false),
    }));

    const moviesResponse = { ...movieData, results: updatedMovies };

    return moviesResponse;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get a list of movies ordered by rating
export async function fetchTopRatedMovies(): Promise<Movie[]> {
  try {
    // Fetch data
    const res = await fetch(
      `${API_ENDPOINT}/movie/top_rated?language=en-US&page=1`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData: MoviesResultsListFromApi = await res.json();

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      isInWatchList: Boolean(false),
    }));

    return updatedMovies;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get a list of movies that are currently in theatres.
export async function fetchNowPlayingMovies(): Promise<Movie[]> {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + "/movie/now_playing?language=en-US&page=1",
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData: MoviesResultsListFromApi = await res.json();

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      isInWatchList: Boolean(false),
    }));

    return updatedMovies;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get a list of upcoming movies
export async function fetchUpcomingMovies(): Promise<Movie[]> {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + "/movie/upcoming?language=en-US&page=1",
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData: MoviesResultsListFromApi = await res.json();

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      isInWatchList: Boolean(false),
    }));

    return updatedMovies;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get a list all genres/categories
export async function fetchAllGenres(): Promise<Genre[]> {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + "/genre/movie/list?language=en",
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const data: GenresFromApi = await res.json();

    // Check data format
    if (!Array.isArray(data.genres)) {
      throw new Error("Invalid data format received");
    }

    return data.genres;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get details about a specific movie
export async function fetchMovieById(movie_id: number) {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + `/movie/${movie_id}?language=en-US`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData = await res.json();

    // Check data format
    // if (!Array.isArray(movieData.results)) {
    //   throw new Error("Invalid data format received");
    // }

    // Add new properties to Movie object
    // const updatedMovie: Movie[] = movieData.results.map((movie) => ({
    //   ...movie,

    //   isFavourite: Boolean(false),
    //   onWatchList: Boolean(false),
    // }));

    return movieData;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}
