import { createMutation, createQuery } from "@/config/query.ts";
import axios, { AxiosError } from "axios";
import { logError } from "@/utils.ts";
import Movie, { MovieApiResult, MovieCategory } from "@/models/movie.ts";
import Cast from "@/models/cast.ts";

// Configured Axios instance based on the TMDB_API URL
const movieApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
});

/** ReactQuery hook to fetch movies based on categories and page number */
export const useFetchMovies = createQuery<MovieApiResult>(["fetch-movies"], ({ queryKey }) => {
  const category = queryKey[1] as MovieCategory;
  const page = queryKey[2];

  return movieApi
    .get(`movie/${category}`, { params: { page } })
    .then(res => res.data)
    .catch((err: AxiosError) => {
      throw logError(err);
    });
});

/** ReactQuery hook to fetch movies based on categories and page number */
export const useSearchMovies = createMutation<{ key: string; page: number }, MovieApiResult, string>(
  ["search-movies"],
  ({ key, page }) => {
    return movieApi
      .get("search/movie", { params: { query: key, page } })
      .then(res => res.data)
      .catch((err: AxiosError) => {
        throw logError(err);
      });
  }
);

/** ReactQuery hook to fetch details of a movie */
export const useFetchMovie = createQuery<Movie>(["fetch-movie"], ({ queryKey }) => {
  const id = queryKey[1];

  return movieApi
    .get(`movie/${id}`)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      throw logError(err);
    });
});

/** ReactQuery hook to fetch details of a movie */
export const useFetchMovieCast = createQuery<{ cast: Cast[] }>(["fetch-movie-cast"], ({ queryKey }) => {
  const id = queryKey[1];

  return movieApi
    .get(`movie/${id}/credits`)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      throw logError(err);
    });
});
