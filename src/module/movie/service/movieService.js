/* eslint-disable class-methods-use-this */

const fetch = require('node-fetch');
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
   * @param {string} url
   * @returns {JSON}
   */
  async fetchData(url) {
    const data = await fetch(url)
      .then((res) => res.json());
    return data;
  }

  /**
   * @param {string} request
   * @returns {JSON} Data of a random movie with the params passed
   */
  async getRandomMovieData(request) {
    const { total_pages: totalPages } = await this.fetchData(this.movieApi.getUrl(request, 1));

    const randomPage = Math.floor(Math.random() * totalPages + 1);
    const movieList = await this.fetchData(this.movieApi.getUrl(request, randomPage));

    const randomMovie = movieList.results[Math.floor(Math.random() * movieList.results.length + 1)];
    const movieData = await this.fetchData(this.movieApi.getUrl(request, null, randomMovie.id));

    return movieData;
  }

  /**
   * @returns {Movie} Mapped Movie Object with fetched/fallback data
   */
  async getMovie(request) {
    const newMovie = await this.getRandomMovieData(request);
    return mapMovie(newMovie);
  }
};
