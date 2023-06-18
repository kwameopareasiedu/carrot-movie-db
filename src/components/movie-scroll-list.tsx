import Movie from "@/models/movie.ts";
import { Loader, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { MovieCard } from "@/components/movie-card.tsx";
import React, { useCallback } from "react";

dayjs.extend(advancedFormat);

interface MovieScrollListProps {
  movies?: Movie[];
  title: string;
  loading?: boolean;
  emptyPlaceholder: string;
  onLoadMore: () => void;
}

const SCROLL_END_THRESHOLD = 400;

export const MovieScrollList = ({ title, movies, emptyPlaceholder, loading, onLoadMore }: MovieScrollListProps) => {
  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, never>) => {
      const el = e.target as HTMLDivElement;
      const atEnd = el.scrollWidth - el.scrollLeft - el.clientWidth < SCROLL_END_THRESHOLD;
      if (atEnd && !loading) onLoadMore();
    },
    [loading, onLoadMore]
  );

  return (
    <div>
      <Title size="h2" className="mb-4">
        {title}
      </Title>

      <div className="whitespace-nowrap overflow-auto slick-scrollbar" onScroll={onScroll}>
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="inline-block me-8">
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))
        ) : (
          <Text italic>{emptyPlaceholder}</Text>
        )}

        {loading && (
          <div className="inline-block h-[480px] px-4 overflow-hidden">
            <div className="inline-grid place-items-center h-full px-4">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
