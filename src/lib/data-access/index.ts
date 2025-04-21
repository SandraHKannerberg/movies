"use server";

import { Genre, GenresFromApi } from "../interfaces/category-interfaces";
import { Credits, People } from "../interfaces/credits-interfaces";
import {
  Movie,
  MovieDetails,
  // MovieDetailsFromApi,
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
  runtimeMin?: number;
  runtimeMax?: number;
  voteRatingMin?: number;
  voteRatingMax?: number;
  voteCountMin?: number;
  voteCountMax?: number;
  genre?: string;
};

export async function fetchMovies({
  yearFrom = new Date().getFullYear(), // Default current year
  yearTo = new Date().getFullYear(), // Default current year
  page,
  sortBy = "popularity.desc", // Default
  runtimeMin = 70,
  runtimeMax = 999,
  voteRatingMin = 0,
  voteRatingMax = 10,
  voteCountMin = 100,
  voteCountMax = 10000,
  genre,
}: FetchMoviesOptions): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}> {
  try {
    // Fetch data
    // TODO: förbättra fetch och gör den dynamisk
    const res = await fetch(
      `${API_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31&region=se&sort_by=${sortBy}&with_release_type=2|3&with_original_language=sv|en&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}&vote_average.gte=${voteRatingMin}&vote_average.lte=${voteRatingMax}&vote_count.gte=${voteCountMin}&vote_count.lte=${voteCountMax}&with_genres=${genre}`,
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

export async function fetchMovieBySearch(query: string): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}> {
  try {
    // Fetch data
    const res = await fetch(
      `${API_ENDPOINT}/search/movie?query=${query}&include_adult=false&language=en-US&region=se&page=1`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const data: MoviesResultsListFromApi = await res.json();

    // Check data format
    if (!Array.isArray(data.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = data.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      isInWatchList: Boolean(false),
    }));

    const searchResponse = { ...data, results: updatedMovies };

    return searchResponse;
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
export async function fetchMovieById(movie_id: number): Promise<MovieDetails> {
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

    // TODO: varför fungerar inte detta?
    // const movieData: MovieDetailsFromApi = await res.json();

    const movieData = await res.json();

    // Add new properties to movie details
    const movieDetails = {
      ...movieData,
      isFavourite: Boolean(false),
      onWatchList: Boolean(false),
    };

    return movieDetails;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

export async function fetchMovieCredits(movie_id: number): Promise<Credits> {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + `/movie/${movie_id}/credits?language=en-US`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const creditsData = await res.json();

    return creditsData;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

// Get more info about people like cast and crew
export async function fetchPeopleById(id: number): Promise<People> {
  try {
    // Fetch data
    const res = await fetch(
      API_ENDPOINT + `/person/ ${id}?language=en-US`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const peopleData = await res.json();

    return peopleData;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}
