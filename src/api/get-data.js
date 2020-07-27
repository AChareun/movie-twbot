import fetch from 'node-fetch';
import { TMDBKEYS } from '../config';

const API_KEY = `api_key=${TMDBKEYS.API_KEY}`;
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?';

const requestMovieList = async (params = '', page = 1) => {
  const MOVIE_LIST = await fetch(
    `${BASE_URL}${API_KEY}&${params}&language=es&include_adult=false&include_video=false&page=${page}`,
  )
    .then((res) => res.json());

  return MOVIE_LIST;
};

const requestARandomMovie = async (params) => {
  const TOTAL_PAGES = await requestMovieList(params).then((res) => res.total_pages);
  if (TOTAL_PAGES === undefined || 0) {
    throw new Error('Something bad happened when requesting to the API');
  }

  const MOVIE_LIST = await requestMovieList(params, Math.floor(Math.random() * TOTAL_PAGES));
  if (MOVIE_LIST.status_message) {
    throw new Error('Something bad happened when requesting to the API');
  }

  const RANDOM_MOVIE = MOVIE_LIST.results[Math.floor(Math.random() * MOVIE_LIST.results.length)];
  const movieData = await fetch(`https://api.themoviedb.org/3/movie/${RANDOM_MOVIE.id}?${API_KEY}&language=en-US`)
    .then((res) => res.json());

  if (movieData.status_message) {
    throw new Error('Something bad happened when requesting to the API');
  }

  return movieData;
};

export default requestARandomMovie;
