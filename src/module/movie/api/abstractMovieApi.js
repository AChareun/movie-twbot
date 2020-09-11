/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const AbstractMovieApiError = require('./error/abstractMovieApiError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractMovieApi {
  constructor() {
    if (new.target === AbstractMovieApi) {
      throw new AbstractMovieApiError('AbstractMovieApi can\'t be instantiated');
    }
  }

  /**
   * @param {string} request
   * @returns {Movie} Mapped Movie Object with fetched/fallback data
   */
  async getMovie(request) {
    throw new MethodNotImplementedError();
  }
};
