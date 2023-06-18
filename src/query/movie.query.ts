import { createMutation, createQuery } from "@/config/query.ts";
import axios, { AxiosError } from "axios";
import { logError } from "@/utils.ts";
import { MovieApiResult, MovieCategory } from "@/models/movie.ts";

// Axios instance configured with auth headers for fetching movies from TMDB
const movieApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL + "movie/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
});

// Axios instance configured with auth headers for searching for movies from TMDB
const searchApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL + "search",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
});

/** ReactQuery hook to fetch movies based on categories and page number */
export const useFetchMovies = createQuery<MovieApiResult>(["fetch-movies"], ({ queryKey }) => {
  const category = queryKey[1] as MovieCategory;
  const page = queryKey[2];

  return movieApi
    .get(category, { params: { page } })
    .then(res => res.data)
    .catch((err: AxiosError) => {
      throw logError(err);
    });
});

/** ReactQuery hook to fetch movies based on categories and page number */
export const useSearchMovies = createMutation<{ key: string; page: number }, MovieApiResult, string>(
  ["search-movies"],
  ({ key, page }) => {
    return searchApi
      .get("movie", { params: { query: key, page } })
      .then(res => res.data)
      .catch((err: AxiosError) => {
        throw logError(err);
      });
  }
);
