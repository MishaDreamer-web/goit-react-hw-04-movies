import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as movieAPI from '../components/services/movie-api';
import PageHeading from '../components/PageHeading/PageHeading';

export default function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  // console.log(location);

  useEffect(() => {
    movieAPI
      .fetchFilms()
      .then(data => {
        return data.results;
      })
      .then(setMovies);
  }, []);

  return (
    <>
      <PageHeading text="Trending Today" />

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                {movie.name}
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
