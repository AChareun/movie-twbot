module.exports = class MovieApi {
  /**
   * @param {string} baseUrl
   * @param {string} apiKey
   * @param {string} baseParams
   * @param {JSON} apiParams
   * @param {JSON} apiGenres
   */
  constructor(baseUrl, apiKey, baseParams, apiParams, apiGenres) {
    this.BASE_URL = baseUrl;
    this.API_KEY = apiKey;
    this.BASE_PARAMS = baseParams;
    this.apiParams = apiParams;
    this.apiGenres = apiGenres;
  }
};
