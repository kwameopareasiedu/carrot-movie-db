import { MovieApiResult } from "@/models/movie.ts";
import { Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { MovieCard } from "@/components/movie-card.tsx";

dayjs.extend(advancedFormat);

interface MovieScrollListProps {
  data?: MovieApiResult;
  title: string;
  emptyPlaceholder: string;
}

export const MovieScrollList = ({ title, data, emptyPlaceholder }: MovieScrollListProps) => {
  return (
    <div>
      <Title size="h2" className="mb-4">
        {title}
      </Title>

      <div className="whitespace-nowrap overflow-auto">
        {data?.results && data.results.length > 0 ? (
          data.results.map(movie => (
            <div key={movie.id} className="inline-block me-8">
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))
        ) : (
          <Text italic>{emptyPlaceholder}</Text>
        )}
      </div>
    </div>
  );
};
