import { Route, Routes } from "react-router-dom";
import { buildListMoviesRoute } from "@/config/routes.ts";
import { lazy, Suspense } from "react";

const ListMoviesPage = lazy(() => import("@/pages/list-movies-page.tsx"));

function App() {
  return (
    <Routes>
      <Route
        path={buildListMoviesRoute()}
        element={
          <Suspense>
            <ListMoviesPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
