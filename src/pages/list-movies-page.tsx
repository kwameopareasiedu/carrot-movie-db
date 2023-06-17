import { Box, Button, Group, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useFetchMovies } from "@/query/movie.query.ts";
import { MovieScrollList } from "@/components";
import { MovieCategory } from "@/models/movie.ts";

export default function ListMoviesPage() {
  const [pages, setPages] = useState({ nowPlaying: 1, popular: 1, topRated: 1, upcoming: 1 });
  const [searchParams, setSearchParams] = useState({ key: "" });
  const nowPlayingMovies = useFetchMovies({ additionalKey: [MovieCategory.NOW_PLAYING, pages.nowPlaying] });
  const popularMovies = useFetchMovies({ additionalKey: [MovieCategory.POPULAR, pages.popular] });
  const topRatedMovies = useFetchMovies({ additionalKey: [MovieCategory.TOP_RATED, pages.popular] });
  const upcomingMovies = useFetchMovies({ additionalKey: [MovieCategory.UPCOMING, pages.popular] });

  return (
    <div className="p-6 md:p-16 flex flex-col gap-8">
      <Group>
        <Box sx={{ flex: 1 }}>
          <Title size="h1" weight="bold" variant="gradient" gradient={{ from: "#EA371E", to: "#352C3A", deg: 90 }}>
            The Carrot Movie DB
          </Title>

          <Text italic>The only movie recommender you&apos;ll need</Text>
        </Box>

        <TextInput
          size="lg"
          radius={0}
          value={searchParams.key}
          placeholder="Search for movie..."
          onChange={e => setSearchParams({ ...searchParams, key: e.target.value })}
        />

        <Button color="blue" size="lg" radius={0} className="w-full lg:w-auto">
          Search
        </Button>
      </Group>

      <MovieScrollList
        title="Now Playing"
        data={nowPlayingMovies.data}
        emptyPlaceholder="No movies playing currently"
      />

      <MovieScrollList title="Popular" data={popularMovies.data} emptyPlaceholder="No popular movies at this time" />
      <MovieScrollList title="Top Rated" data={topRatedMovies.data} emptyPlaceholder="No top rated at this time" />
      <MovieScrollList title="Upcoming" data={upcomingMovies.data} emptyPlaceholder="No upcoming movies at this time" />
    </div>
  );
}
