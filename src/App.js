import { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import LoaderSpinner from './components/Loader/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found-view-page" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
