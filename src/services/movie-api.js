import axios from 'axios';

const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchWithErrorHandling = async (url = '') => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export function fetchFilms() {
  return fetchWithErrorHandling(`/trending/movie/day`);
}

export function fetchFilmDetails(movieId) {
  return fetchWithErrorHandling(`/movie/${movieId}?language=en-US`);
}

export function fetchFilmCredits(movieId) {
  return fetchWithErrorHandling(`/movie/${movieId}/credits?language=en-US`);
}

export function fetchFilmReviews(movieId) {
  return fetchWithErrorHandling(
    `/movie/${movieId}/reviews?language=en-US&page=1`,
  );
}

export function fetchMoviesByQuery(query) {
  return fetchWithErrorHandling(
    `/search/movie?language=en-US&page=1&include_adult=false&query=${query}`,
  );
}
