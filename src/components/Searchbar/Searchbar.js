import React, { useState } from 'react';
import { toast, Zoom } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [moviesQuery, setMoviesQuery] = useState('');

  const handleChange = e => {
    setMoviesQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (moviesQuery.trim() === '') {
      return toast.warn('Enter your request', {
        position: 'top-center',
        transition: Zoom,
        style: {
          top: 80,
          textAlign: 'center',
          width: 290,
          margin: '0 auto',
        },
      });
    }

    onSubmit(moviesQuery);
    setMoviesQuery('');
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={moviesQuery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />

        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
