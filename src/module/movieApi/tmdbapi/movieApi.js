/* eslint-disable class-methods-use-this */

const fetch = require('node-fetch');

const AbstractMovieApi = require('../abstractMovieApi');

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
