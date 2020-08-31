const AbstractMovieApi = require('../abstractMovieApi');

module.exports = class TMDBMovieApi extends AbstractMovieApi {
  /**
   * @param {string} apiKey
   * @param {string} baseUrl
   * @param {string} baseParams
   * @param {Object} apiInfo Contains the params supported by the concrete API
   */
  constructor({
    apiKey, baseUrl, baseParams, apiParams,
  }) {
    super();
    this.API_KEY = apiKey;
    this.BASE_URL = baseUrl;
    this.BASE_PARAMS = baseParams;
    this.API_PARAMS = apiParams;
  }

  /**
   * @param {Array} param
   * @returns {Array} Array with concrete-api-valid parameter
   */
  validateParams(param) {
    const { API_PARAMS } = this;
    const paramToValidate = param;

    const paramIndex = API_PARAMS.findIndex((item) => item.param === paramToValidate[0]);
    if (paramIndex === -1) throw new Error('invalid parameter');
    paramToValidate[0] = API_PARAMS[paramIndex].apiFormat;

    if (API_PARAMS[paramIndex].apiData) {
      const { apiData } = API_PARAMS[paramIndex];
      const valueIndex = apiData.findIndex((item) => item.name === paramToValidate[1]);

      if (valueIndex === -1) throw new Error('invalid value');
      paramToValidate[1] = apiData[valueIndex].value;
    }

    return [...paramToValidate];
  }

  /**
   * @param {Array} params Array of arrays with key-value mapped params
   * @returns {string} string with params ready to be appended to url
   */
  keyValueToQuery(params) {
    const validParams = params.map((param) => this.validateParams(param).join(''));

    return validParams.join('&');
  }

  /**
   * @param {Array} request
   * @param {number} page
   * @param {number} id
   * @returns {string} api endpoint to fetch data
   */
  getUrl(request, page, id) {
    this.params = this.params ? this.params : this.keyValueToQuery(request);

    if (id) {
      const URL = `${this.BASE_URL}/movie/${id}?api_key${this.API_KEY}&language=en-US`;
      return URL;
    }

    const PAGE = `&page=${page}`;
    const URL = `${this.BASE_URL}/discover/movie?api_key${this.API_KEY}&${this.params + PAGE + this.BASE_PARAMS}`;

    return URL;
  }
};
