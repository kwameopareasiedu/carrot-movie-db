import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFetchMovie, useFetchMovieCast } from "@/query/movie.query.ts";
import { Anchor, Avatar, Breadcrumbs, Button, Loader, Text, Title } from "@mantine/core";
import { CiWarning } from "react-icons/ci";
import { buildListMoviesRoute } from "@/config/routes.ts";
import { useCallback, useEffect, useState } from "react";
import Movie from "@/models/movie.ts";
import { buildMoviePosterUrl } from "@/utils.ts";
import { Ratings } from "@/components";
import { TbLanguage } from "react-icons/tb";
import dayjs from "dayjs";
import advFmt from "dayjs/plugin/advancedFormat";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RxExternalLink } from "react-icons/rx";

dayjs.extend(advFmt);

export default function MovieViewPage() {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const [movie, setMovie] = useState<Movie>();
  const movieQuery = useFetchMovie({ additionalKey: [id], onSuccess: data => setMovie(data) });
  const movieCastQuery = useFetchMovieCast({ additionalKey: [id] });
  const [backdropPosition, setBackdropPosition] = useState("50% 50%");

  const onBackdropMouseMove = useCallback((e: MouseEvent) => {
    const posX = Math.trunc((100 * e.clientX) / window.innerWidth);
    const posY = Math.trunc((100 * e.clientY) / window.innerHeight);
    setBackdropPosition(`${posX}% ${posY}%`);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onBackdropMouseMove);

    return () => window.removeEventListener("mousemove", onBackdropMouseMove);
  }, [onBackdropMouseMove]);

  return (
    <div className="min-h-screen">
      {movieQuery.isLoading && (
        <div className="flex items-center justify-center py-12 gap-4">
          <Loader className="inline-block" />
          <Text>Fetching wait...</Text>
        </div>
      )}

      {movieQuery.error && (
        <div className="flex items-center justify-center py-12 gap-4">
          <CiWarning />

          <Text>{movieQuery.error}</Text>

          <Button color="red" className="bg-red-600" radius={0} onClick={() => movieQuery.refetch()}>
            Retry
          </Button>

          <Button
            component={Link}
            to={{ pathname: buildListMoviesRoute(), search: `?key=${queryParams.get("key")}` }}
            radius={0}
          >
            Back to movies
          </Button>
        </div>
      )}

      {movie && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10">
            <img
              src={buildMoviePosterUrl(movie.backdrop_path)}
              className="w-full h-full object-cover"
              alt="Movie backdrop"
              style={{ objectPosition: backdropPosition }}
            />
          </div>

          <div className="h-[100vh] bg-gradient-to-b from-transparent to-black text-white">
            <div className="grid grid-cols-3">
              <div className="pt-[40vh] px-8 pb-8 md:px-32 col-span-3 md:col-span-2 bg-gradient-to-b from-transparent to-black">
                <Breadcrumbs>
                  <Anchor
                    component={Link}
                    to={{ pathname: buildListMoviesRoute(), search: `?key=${queryParams.get("key")}` }}
                    color="white"
                  >
                    Movies
                  </Anchor>

                  <Text color="white">{movie.title}</Text>
                </Breadcrumbs>

                <h1 className="text-[5rem] font-bold leading-tight">{movie.title}</h1>

                <Text mb="xl" italic>
                  {movie.tagline}
                </Text>

                <Text mb="xl" italic>
                  {movie.genres.map(genre => genre.name).join(", ")}
                </Text>

                <Ratings total={10} rating={movie.vote_average} stars={5} votes={movie.vote_count} className="mb-4" />

                <p className="mb-2">
                  <BsFillCalendarDateFill className="inline text-md me-2" />
                  {dayjs(movie.release_date).format("dddd, Do MMMM, YYYY")}
                </p>

                <p className="mb-8">
                  <TbLanguage className="inline text-xl me-2" />
                  {movie.spoken_languages.map(lang => lang.english_name).join(", ") || <i>Languages not available</i>}
                </p>

                {movie.homepage && (
                  <a className="font-bold leading-none" href={movie.homepage} target="_blank">
                    Visit Website <RxExternalLink className="inline text-xl align-sub" />
                  </a>
                )}
              </div>

              <div className="p-8 col-span-3 md:col-span-1 md:h-screen overflow-auto slick-scrollbar backdrop-blur-lg">
                <img
                  src={buildMoviePosterUrl(movie.poster_path)}
                  className="w-full h-[560px] object-contain rounded-xl overflow-hidden mb-16"
                  alt="Movie poster"
                />

                <Title size="h1" weight="light" mb={12}>
                  Plot
                </Title>

                <Text size="lg" mb={64}>
                  {movie.overview}
                </Text>

                <Title size="h1" weight="light" mb={12}>
                  Cast
                </Title>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
                  {movieCastQuery.data?.cast.map(cast => (
                    <div key={cast.id} className="flex flex-col gap-2">
                      <Avatar className="mx-auto" src={buildMoviePosterUrl(cast.profile_path)} size="xl">
                        {cast.name
                          .split(" ")
                          .map(p => p.charAt(0))
                          .join(" ")}
                      </Avatar>

                      <Text className="leading-tight" align="center">
                        <strong>{cast.name}</strong> as <strong className="italic">{cast.character}</strong>
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*<p>You are here</p>*/}
    </div>
  );
}
