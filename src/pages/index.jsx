import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const MainPage = lazy(() => import("./MainPage/MainPage"));
const Project = lazy(() => import("./UserPage/UserPage"));

const ROUTELIST = [
  { key: "main", path: "/", Page: MainPage },
  { key: "project", path: "/:owner/:name/:id", Page: Project },
];

export const Routing = () => {
  return (
    <Suspense fallback={<h3>Загрузочка...</h3>}>
      <Routes>
        {ROUTELIST.map(({ key, path, Page }) => (
          <Route key={key} path={path} element={<Page />} />
        ))}
      </Routes>
    </Suspense>
  );
};
