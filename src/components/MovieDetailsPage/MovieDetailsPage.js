import { lazy, Suspense } from 'react';

import {
  Switch,
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoaderSpinner from '../Loader/Loader';

// import PageHeading from '../PageHeading/PageHeading';

import * as movieAPI from '../services/movie-api';

import image from '../../images/no-image.jpg';
// import Cast from '../Cast/Cast';
// import Reviews from '../Reviews/Reviews';

const Cast = lazy(() =>
  import('../Cast/Cast' /* webpackChunkName: "cast-sub-page" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews-sub-page" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    movieAPI.fetchFilmDetails(movieId).then(setMovieDetails);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>

      {movieDetails && (
        <>
          <img
            src={
              movieDetails.poster_path === null
                ? image
                : `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
            }
            alt={movieDetails.title}
          />
          <h2>
            {movieDetails.name}
            {movieDetails.title}
            {movieDetails.release_date && (
              <span> ({movieDetails.release_date.slice(0, 4)})</span>
            )}
          </h2>
          <p>User Score: {movieDetails.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          {movieDetails.genres.length !== 0 ? (
            <ul>
              {movieDetails.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          ) : (
            <p>This film has no genres</p>
          )}
          <hr />

          <p>Additional Information</p>

          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
        </>
      )}

      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path={`${path}/cast`}>
            {movieDetails && <Cast movieId={movieId} />}
          </Route>

          <Route path={`${path}/reviews`}>
            {movieDetails && <Reviews movieId={movieId} />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
