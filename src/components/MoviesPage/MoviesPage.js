import { useState, useEffect } from 'react';
import * as moviesApi from '../services/movie-api';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import LoaderSpinner from '../Loader/Loader';
import image from '../../images/no-image.jpg';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [moviesQuery, setMoviesQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const historyQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!searchQuery) {
      setSearchQuery(historyQuery);
      return;
    }

    setStatus('pending');

    moviesApi
      .fetchMoviesByQuery(searchQuery)
      .then(data => {
        return data.results;
      })
      .then(movies => {
        if (movies.length === 0) {
          setError(
            `Sorry for your request ${searchQuery}, no results were found.`,
          );
          setStatus('rejected');
          return;
        } else {
          setMoviesQuery(movies);

          setStatus('resolved');
        }
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, [historyQuery, searchQuery]);

  const handleFormSubmit = movieQuery => {
    if (!movieQuery) {
      setStatus('rejected');
      setError(`Sorry, but you haven't entered anything into the search bar.`);
      return;
    }
    setSearchQuery(movieQuery);
    history.push({
      ...location,
      search: `query=${movieQuery}`,
    });
  };

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Enter what movies you want to search
        </h2>
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <LoaderSpinner />
        </div>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {error}
        </h2>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {moviesQuery && (
          <ul>
            {moviesQuery.map(movieQuery => (
              <li key={movieQuery.id}>
                <Link
                  to={{
                    pathname: `${url}/${movieQuery.id}`,
                    state: {
                      from: location,
                    },
                  }}
                >
                  <img
                    src={
                      movieQuery.poster_path === null
                        ? image
                        : `https://image.tmdb.org/t/p/w300${movieQuery.poster_path}`
                    }
                    alt={movieQuery.title}
                  />
                  <h2>{movieQuery.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
