import { Route, Routes } from "react-router-dom";
import { buildListMoviesRoute, buildMovieDetailsRoute } from "@/config/routes.ts";
import { lazy, Suspense } from "react";

const MovieListPage = lazy(() => import("@/pages/movie-list-page.tsx"));
const MovieViewPage = lazy(() => import("@/pages/movie-view-page.tsx"));

function App() {
  return (
    <Routes>
      <Route
        path={buildListMoviesRoute()}
        element={
          <Suspense>
            <MovieListPage />
          </Suspense>
        }
      />
      <Route
        path={buildMovieDetailsRoute()}
        element={
          <Suspense>
            <MovieViewPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
