"use server";

import { Movie, MovieFromApi, MoviesApiData } from "./interfaces";

const API_ENDPOINT = "https://api.themoviedb.org/3";

const TOKEN = process.env.ACCESS_TOKEN_AUTH;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function fetchNowPlayingMovies() {
  const res = await fetch(
    API_ENDPOINT + "/movie/now_playing?language=en-US&page=1",
    options
  );

  if (!res.ok) {
    throw new Error(`Error HTTP status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function fetchMoviesByYear(
  yearFrom: number,
  yearTo: number
): Promise<Movie[]> {
  try {
    // Fetch data
    const res = await fetch(
      `${API_ENDPOINT}/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31&region=se&sort_by=popularity.desc&with_release_type=2|3&with_original_language=en|sv`,
      options
    );

    // Check response
    if (!res.ok) {
      throw new Error(`Error HTTP status: ${res.status}`);
    }

    const movieData: MoviesApiData = await res.json();

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      onWatchList: Boolean(false),
    }));

    return updatedMovies;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}

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

    const movieData: MoviesApiData = await res.json();

    // Check data format
    if (!Array.isArray(movieData.results)) {
      throw new Error("Invalid data format received");
    }

    // Add new properties to Movie object
    const updatedMovies: Movie[] = movieData.results.map((movie) => ({
      ...movie,

      isFavourite: Boolean(false),
      onWatchList: Boolean(false),
    }));

    return updatedMovies;
  } catch (error) {
    console.error("Error, can not fetch data:", error);
    throw error;
  }
}
