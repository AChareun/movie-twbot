/**
 * @typedef { import('../../parameter/parameterService') } ParameterService
 */

const fetch = require('node-fetch');

const AbstractMovieApi = require('../abstractMovieApi');
const { keyValueToQuery } = require('../../../utils/keyValueMapper');
const apiParams = require('./params.json');

module.exports = class MovieApi extends AbstractMovieApi {
    /**
     * @param {string} apiKey
     * @param { ParameterService } parameterService
     */
    constructor(apiKey, parameterService) {
        super();
        this.API_KEY = apiKey;
        this.BASE_URL = 'https://api.themoviedb.org/3';
        this.BASE_PARAMS = '&language=es-ES&include_adult=false&include_video=false';
        this.API_PARAMS = apiParams;
        this.parameterService = parameterService;
    }

    /**
     * @param {number} page
     * @param {number} id
     * @returns {string} url with the requested query to make the api call
     */
    constructUrl(page, id) {
        const { BASE_URL, API_KEY, BASE_PARAMS, params } = this;

        if (id) {
            const URL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
            return URL;
        }

        const PAGE = `&page=${page}`;
        const URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&${params + PAGE + BASE_PARAMS}`;

        return URL;
    }

    /**
     * @param {Array<Array>} request
     * @param {number} page
     * @param {number} id
     * @returns {JSON} data retrieved from the api endpoint
     */
    async getMovieData(request, page, id) {
        const validatedParams = this.parameterService.validateParams(request);
        this.params = keyValueToQuery(validatedParams);

        const urlToFetch = this.constructUrl(page, id);

        const fetchedData = await fetch(urlToFetch).then((res) => res.json());

        if (fetchedData.total_pages) {
            const response = { totalPages: fetchedData.totalPages, ...fetchedData };
            delete response.data.total_pages;

            return response;
        }

        return fetchedData;
    }
};
