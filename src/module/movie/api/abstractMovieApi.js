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
   * @param {number} page
   * @param {number} id
   * @returns {string} api endpoint to fetch data
   */
  getUrl(request, page, id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Array} param
   * @returns {Array} Array with concrete-api-valid parameter
   */
  validateParams(param) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Array} params Array of arrays with key-value mapped params
   * @returns {string} string with params ready to be appended to url
   */
  keyValueToQuery(params) {
    throw new MethodNotImplementedError();
  }
};
