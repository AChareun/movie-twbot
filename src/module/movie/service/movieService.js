/**
 * @typedef {import('../../param/service/paramService')} ParamService
 * @typedef {import('../../api/movieApi')} MovieApi
 * @typedef {import('../entity/movie)} Movie
 */

const fetch = require('node-fetch');
const mapMovie = require('../mapper/movieMapper');

/**
 * @param {MovieApi} param0 Destructured props of the object passed
 * @param {string} params
 * @param {number} page
 * @returns {JSON} Page of movie results for params passed
 */
async function fetchMovieList({ BASE_URL, API_KEY, BASE_PARAMS }, params = '', page = 1) {
  const movieList = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&${params}${BASE_PARAMS}&page=${page}`,
  )
    .then((res) => res.json());

  return movieList;
}

/**
 * @param {MovieApi} param0 Destructured props of the object passed
 * @param {number} movieId
 * @returns {JSON} Data of the movie fetched
 */
async function fetchMovieData({ BASE_URL, API_KEY }, movieId) {
  const movieData = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)
    .then((res) => res.json());

  return movieData;
}

module.exports = class MovieService {
  /**
   * @param {ParamService} paramService
   * @param {MovieApi} movieApi
   */
  constructor(paramService, movieApi) {
    this.paramService = paramService;
    this.movieApi = movieApi;
  }

  /**
   * @returns {JSON} Data of a random movie with the params passed
   */
  async getMovieData() {
    const params = this.paramService.getParams();

    const totalPages = await fetchMovieList(
      this.movieApi, params,
    ).then((res) => res.total_pages);

    const movieList = await fetchMovieList(
      this.movieApi, params, Math.floor(Math.random() * totalPages),
    );

    const randomMovie = movieList.results[Math.floor(Math.random() * movieList.results.length)];
    const movieData = await fetchMovieData(this.movieApi, randomMovie.id);

    return movieData;
  }

  /**
   * @returns {Movie} Mapped Movie Object with fetched/fallback data
   */
  async getMovie() {
    const newMovie = await this.getMovieData();
    return mapMovie(newMovie);
  }
};
