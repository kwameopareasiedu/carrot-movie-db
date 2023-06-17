import Movie from "@/models/movie.ts";
import { Popover, Text, Title } from "@mantine/core";
import { CiCalendarDate } from "react-icons/ci";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { AiOutlineStar } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";

dayjs.extend(advancedFormat);

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [titleOpened, { open, close }] = useDisclosure(false);

  return (
    <div className="inline-block relative w-full max-w-[360px] h-[480px] overflow-hidden rounded-xl whitespace-normal">
      <img
        className="w-full h-full object-cover"
        src={import.meta.env.VITE_TMDB_POSTER_API_URL + movie.backdrop_path}
        alt="Movie poster"
        loading="lazy"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="absolute left-0 bottom-0 w-full p-4 text-white">
        <div className="flex items-end gap-4 mb-4">
          <img
            className="w-24 h-24 object-cover overflow-hidden rounded-xl"
            src={import.meta.env.VITE_TMDB_POSTER_API_URL + movie.poster_path}
            alt="Movie poster"
            loading="lazy"
          />

          <div className="flex-1  overflow-hidden">
            <Popover opened={titleOpened} position="bottom-start" withinPortal>
              <Popover.Target>
                <Title size="h3" className="mb-2 truncate" onMouseEnter={open} onMouseLeave={close}>
                  {movie.title}
                </Title>
              </Popover.Target>

              <Popover.Dropdown bg="black" className="border-black">
                <Text className="text-white" onMouseEnter={open} onMouseLeave={close}>
                  {movie.title}
                </Text>
              </Popover.Dropdown>
            </Popover>

            <div className="flex items-center gap-2">
              <CiCalendarDate size={18} />
              <Text size="sm">{dayjs(movie.release_date).format("Do MMM YY")}</Text>
            </div>

            <div className="flex items-center gap-2">
              <AiOutlineStar />

              <Text size="sm">
                <strong>{movie.vote_average}</strong> / 10 from <strong>{movie.vote_count}</strong> votes
              </Text>
            </div>
          </div>
        </div>

        <p>{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  );
};
