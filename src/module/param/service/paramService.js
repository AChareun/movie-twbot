/**
 * @param {string} text
 * @returns {Array} an array of arrays with params key-value pairs
 */
function extractParams(text) {
  const extractedParams = text.split('/').map((param) => param.split(':'));
  return extractedParams;
}

/**
 * @param {string} param
 * @param {JSON} genreList
 * @returns {number | Error} api id for the genre
 */
function getGenreId(param, genreList) {
  const genre = param;

  const genreIndex = genreList.findIndex((gen) => gen.name === genre);
  if (genreIndex === -1) throw new Error('invalid genre');

  const genreID = genreList[genreIndex].id;

  return genreID;
}

/**
 * @param {Array} param
 * @param {JSON} apiParams
 * @param {JSON} apiGenres
 * @returns {Array} param key, value and index in the param list
 */
function validateParams(param, apiParams, apiGenres) {
  const paramToValidate = param;
  const paramIndex = apiParams.findIndex((item) => item.param === paramToValidate[0]);
  if (paramIndex === -1) throw new Error('invalid parameter');
  if (param[0] === 'genero') {
    paramToValidate[1] = getGenreId(paramToValidate[1], apiGenres);
  }

  return [...paramToValidate, paramIndex];
}

/**
 * @param {Array} param
 * @param {JSON} apiParams
 * @returns {string} param ready to add to url
 */
function formatParams(param, apiParams) {
  const newParam = param;
  newParam[0] = apiParams[param[2]].format;
  newParam.pop();

  return newParam.join('');
}

/**
 * @typedef {import('../../api/movieApi')} MovieApi
 */
module.exports = class ParamService {
  /**
   * @param {string} request
   * @param {MovieApi} movieApi
   */
  constructor(request, movieApi) {
    this.request = request;
    this.movieApi = movieApi;
  }

  /**
   * @function sets this instance params after proccessing them
   */
  setParams() {
    const rawParams = extractParams(this.request);
    const validatedParams = rawParams.map((param) => validateParams(
      param, this.movieApi.apiParams, this.movieApi.apiGenres,
    ));
    // eslint-disable-next-line arrow-body-style
    const formattedParams = validatedParams.map((param) => {
      return formatParams(param, this.movieApi.apiParams);
    });

    this.params = formattedParams.join('&');
  }

  /**
   * @returns {string} string with params ready to implement on a url
   */
  getParams() {
    this.setParams();
    return this.params;
  }
};
