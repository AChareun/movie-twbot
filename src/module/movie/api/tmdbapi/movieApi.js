/* eslint-disable class-methods-use-this */

const fetch = require('node-fetch');

const AbstractMovieApi = require('../abstractMovieApi');

/**
 * @param {Array} param
 * @param {JSON} API_PARAMS
 * @returns {Array} Array with concrete-api-valid parameter
 */
function validateParams(param, API_PARAMS) {
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
 * @param {JSON} API_PARAMS
 * @returns {string} string with params ready to be appended to url
 */
function keyValueToQuery(params, API_PARAMS) {
    const validParams = params.map((param) => validateParams(param, API_PARAMS).join(''));

    return validParams.join('&');
}

/**
 * @param {AbstractMovieApi} param0
 * @param {number} page
 * @param {number} id
 * @returns {string} url with the requested query to make the api call
 */
function constructUrl({ BASE_URL, API_KEY, BASE_PARAMS, params }, page, id) {
    if (id) {
        const URL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
        return URL;
    }

    const PAGE = `&page=${page}`;
    const URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&${params + PAGE + BASE_PARAMS}`;

    return URL;
}

module.exports = class MovieApi extends AbstractMovieApi {
    /**
     * @param {string} apiKey
     * @param {string} baseUrl
     * @param {string} baseParams
     * @param {JSON} apiParams Contains the params supported by the concrete API
     */
    constructor(apiKey, baseUrl, baseParams, apiParams) {
        super();
        this.API_KEY = apiKey;
        this.BASE_URL = baseUrl;
        this.BASE_PARAMS = baseParams;
        this.API_PARAMS = apiParams;
    }

    /**
     * @param {string} request
     * @param {number} page
     * @param {number} id
     * @returns {JSON} data retrieved from the api endpoint
     */
    async getMovieData(request, page, id) {
        this.params = this.params ? this.params : keyValueToQuery(request, this.API_PARAMS);
        const urlToFetch = constructUrl(this, page, id);

        const fetchedData = await fetch(urlToFetch).then((res) => res.json());

        return fetchedData;
    }
};
