/* eslint-disable class-methods-use-this */

const mapMovie = require('../mapper/movieMapper');

/**
 * @typedef {import('../../param/service/paramService')} ParamService
 * @typedef {import('../api/abstractMovieApi')} AbstractMovieApi
 * @typedef {import('../entity/movie)} Movie
 */

module.exports = class MovieService {
  /**
   * @param {AbstractMovieApi} movieApi
   */
  constructor(movieApi) {
    this.movieApi = movieApi;
  }

  /**
   * @param {string} request
   * @returns {Movie} Mapped Movie Object with fetched/fallback data
   */
  async getMovie(request) {
    const { total_pages: totalPages } = await this.movieApi.getMovieData(request, 1);

    const randomPage = Math.floor(Math.random() * totalPages + 1);
    const movieList = await this.movieApi.getMovieData(request, randomPage);

    const randomMovie = movieList.results[Math.floor(Math.random() * movieList.results.length + 1)];
    const movieData = await this.movieApi.getMovieData(request, null, randomMovie.id);

    const movie = mapMovie(movieData);
    return movie;
  }
};
