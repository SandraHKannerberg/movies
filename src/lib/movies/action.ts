"use server";

const API_ENDPOINT =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const TOKEN = process.env.ACCESS_TOKEN_AUTH;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function fetchNowPlayingMovies() {
  const res = await fetch(API_ENDPOINT, options);

  if (!res.ok) {
    throw new Error(`Error HTTP status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
