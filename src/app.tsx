import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "@/config/routes.ts";
import { lazy, Suspense } from "react";

const ListMoviesPage = lazy(() => import("@/pages/list-movies-page.tsx"));

function App() {
  return (
    <Routes>
      <Route
        path={ROUTE_LIST()}
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
