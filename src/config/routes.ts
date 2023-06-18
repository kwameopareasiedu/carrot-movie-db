/** Router configuration. These are functions to allow passing of parameters */

export const buildListMoviesRoute = () => "/";

export const buildMovieDetailsRoute = (id?: string | number) => `/${id || ":id"}`;
