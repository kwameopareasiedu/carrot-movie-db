import { Box, Button, Group, Text, TextInput, Title } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchMovies, useSearchMovies } from "@/query/movie.query.ts";
import { Footer, MovieScrollList } from "@/components";
import Movie, { MovieCategory } from "@/models/movie.ts";
import { useSearchParams } from "react-router-dom";
import { copyUnique } from "@/utils.ts";
import { notifications } from "@mantine/notifications";

export default function MovieListPage() {
  const [queryParams, setQueryParams] = useSearchParams();
  const searchKey = queryParams.get("key") || "";
  const enabled = !searchKey;
  const [pages, setPages] = useState({
    nowPlaying: 1,
    popular: 1,
    topRated: 1,
    upcoming: 1,
    search: 1
  });

  // To implement infinite scroll, the movie lists are stored separately from React Query
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

  const nowPlayingMovieQuery = useFetchMovies({
    additionalKey: [MovieCategory.NOW_PLAYING, pages.nowPlaying],
    enabled,
    onSuccess: data => {
      const isUnique = (movie: Movie) => !nowPlayingMovies.map(m => m.id).includes(movie.id);
      const newNowPlayingMovies = [...nowPlayingMovies];
      copyUnique(newNowPlayingMovies, data.results, isUnique);
      setNowPlayingMovies(newNowPlayingMovies);
    },
    onError: err => {
      notifications.show({
        color: "red",
        title: "Something went wrong here!",
        message: err || "An unknown error occurred",
        autoClose: false
      });
    }
  });

  const popularMovieQuery = useFetchMovies({
    additionalKey: [MovieCategory.POPULAR, pages.popular],
    enabled,
    onSuccess: data => {
      const isUnique = (movie: Movie) => !popularMovies.map(m => m.id).includes(movie.id);
      const newPopularMovies = [...popularMovies];
      copyUnique(newPopularMovies, data.results, isUnique);
      setPopularMovies(newPopularMovies);
    },
    onError: err => {
      notifications.show({
        color: "red",
        title: "Something went wrong here!",
        message: err || "An unknown error occurred",
        autoClose: false
      });
    }
  });

  const topRatedMovieQuery = useFetchMovies({
    additionalKey: [MovieCategory.TOP_RATED, pages.topRated],
    enabled,
    onSuccess: data => {
      const isUnique = (movie: Movie) => !topRatedMovies.map(m => m.id).includes(movie.id);
      const newTopRatedMovies = [...topRatedMovies];
      copyUnique(newTopRatedMovies, data.results, isUnique);
      setTopRatedMovies(newTopRatedMovies);
    },
    onError: err => {
      notifications.show({
        color: "red",
        title: "Something went wrong here!",
        message: err || "An unknown error occurred",
        autoClose: false
      });
    }
  });

  const upcomingMovieQuery = useFetchMovies({
    additionalKey: [MovieCategory.UPCOMING, pages.upcoming],
    enabled,
    onSuccess: data => {
      const isUnique = (movie: Movie) => !upcomingMovies.map(m => m.id).includes(movie.id);
      const newUpcomingMovies = [...upcomingMovies];
      copyUnique(newUpcomingMovies, data.results, isUnique);
      setUpcomingMovies(newUpcomingMovies);
    },
    onError: err => {
      notifications.show({
        color: "red",
        title: "Something went wrong here!",
        message: err || "An unknown error occurred",
        autoClose: false
      });
    }
  });

  const searchMovieMutation = useSearchMovies({
    onSuccess: data => {
      const isUnique = (movie: Movie) => !searchedMovies.map(m => m.id).includes(movie.id);
      const newSearchedMovies = [...searchedMovies];
      copyUnique(newSearchedMovies, data.results, isUnique);
      setSearchedMovies(newSearchedMovies);
    },
    onError: err => {
      notifications.show({
        color: "red",
        title: "Something went wrong here!",
        message: err || "An unknown error occurred",
        autoClose: false
      });
    }
  });

  const onSearchKeyChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, key: e.target.value }, { replace: true });
    setPages({ ...pages, search: 1 });
    setSearchedMovies([]);
  };

  const triggerSearch = () => {
    if (searchKey) {
      searchMovieMutation.mutate({ key: searchKey, page: pages.search });
      setSearchedMovies([]);
    }
  };

  useEffect(() => {
    if (searchKey) triggerSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="fixed top-0 left-0 w-screen z-10 py-2 px-6 md:px-16 bg-white shadow-lg">
        <Group className="w-full">
          <Box sx={{ flex: 1 }}>
            <Title size="h2" weight="bold" variant="gradient" gradient={{ from: "#EA371E", to: "#352C3A", deg: 90 }}>
              The Carrot Movie DB
            </Title>

            <Text size="sm" italic>
              The only movie recommender you&apos;ll need
            </Text>
          </Box>

          <TextInput
            radius={0}
            value={searchKey}
            placeholder="Search for movies..."
            onChange={onSearchKeyChanged}
            onKeyUp={e => {
              if (e.key === "Enter") triggerSearch();
            }}
          />

          <Button
            radius={0}
            className="w-full lg:w-auto bg-orange-600"
            loading={searchMovieMutation.isLoading}
            onClick={triggerSearch}
            disabled={!searchKey}
          >
            Search
          </Button>
        </Group>
      </Box>

      <div className="p-6 pt-[256px] md:p-16 md:pt-[192px] lg:pt-[128px] flex flex-col gap-8">
        {searchKey ? (
          <MovieScrollList
            title={`Showing Results for "${searchKey}"`}
            movies={searchedMovies}
            loading={nowPlayingMovieQuery.isLoading}
            emptyPlaceholder={`No results for "${searchKey}"`}
            onLoadMore={() => setPages({ ...pages, search: ++pages.search })}
          />
        ) : (
          <>
            <MovieScrollList
              title="Now Playing"
              movies={nowPlayingMovies}
              loading={nowPlayingMovieQuery.isLoading}
              emptyPlaceholder="No movies playing currently"
              onLoadMore={() => setPages({ ...pages, nowPlaying: ++pages.nowPlaying })}
            />

            <MovieScrollList
              title="Popular"
              movies={popularMovies}
              loading={popularMovieQuery.isLoading}
              emptyPlaceholder="No popular movies at this time"
              onLoadMore={() => setPages({ ...pages, popular: ++pages.popular })}
            />

            <MovieScrollList
              title="Top Rated"
              movies={topRatedMovies}
              loading={topRatedMovieQuery.isLoading}
              emptyPlaceholder="No top rated at this time"
              onLoadMore={() => setPages({ ...pages, topRated: ++pages.topRated })}
            />

            <MovieScrollList
              title="Upcoming"
              movies={upcomingMovies}
              loading={upcomingMovieQuery.isLoading}
              emptyPlaceholder="No upcoming movies at this time"
              onLoadMore={() => setPages({ ...pages, upcoming: ++pages.upcoming })}
            />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
