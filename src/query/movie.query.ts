import { createQuery } from "@/config/query.ts";
import axios, { AxiosError } from "axios";
import { logError } from "@/utils.ts";
import { MovieApiResult, MovieCategory } from "@/models/movie.ts";

const movieApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL + "movie/",
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
//
// /** ReactQuery hook to fetch now playing */
// export const useFetchNowPlayingMovies = createQuery<MovieApiResult>(["fetch-now-playing"], ({ queryKey }) => {
//   const page = queryKey[1];
//
//   return movieApi
//     .get("now_playing", { params: { page } })
//     .then(res => res.data)
//     .catch((err: AxiosError) => {
//       throw logError(err);
//     });
// });
//
// /** ReactQuery hook to fetch popular movies */
// export const useFetchPopularMovies = createQuery<MovieApiResult>(["fetch-popular"], ({ queryKey }) => {
//   const page = queryKey[1];
//
//   return movieApi
//     .get("popular", { params: { page } })
//     .then(res => res.data)
//     .catch((err: AxiosError) => {
//       throw logError(err);
//     });
// });
