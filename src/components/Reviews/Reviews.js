import { useState, useEffect } from 'react';
import * as movieAPI from '../services/movie-api';

export default function Reviews({ movieId }) {
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchFilmReviews(movieId)
      .then(data => {
        return data.results;
      })
      .then(data => setMovieReviews(data));
  }, [movieId]);

  return (
    <>
      {movieReviews.length !== 0 ? (
        <ul>
          {movieReviews.map(movieReviews => (
            <li key={movieReviews.id}>
              <h2>Author: {movieReviews.author}</h2>

              <p>{movieReviews.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}
