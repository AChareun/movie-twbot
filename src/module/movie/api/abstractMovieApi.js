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
   * @param {Array} request
   * @returns {JSON} fetched data from the api
   */
  async getMovieData(request) {
    throw new MethodNotImplementedError();
  }
};
