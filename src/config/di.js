const {
  default: DIContainer, object, get,
} = require('rsdi');
const MovieService = require('../module/movie/service/movieService');
const AnswerService = require('../module/answer/service/answerService');
const MovieApi = require('../module/movie/api/tmdbapi/movieApi');
const apiParams = require('../module/movie/api/tmdbapi/params.json');

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    MovieApiParams: apiParams,
    MovieApiBaseUrl: 'https://api.themoviedb.org/3',
    MovieApiBaseParams: '&language=es-ES&include_adult=false&include_video=false',
    MovieApiKey: process.env.API_KEY,
    MovieApi: object(MovieApi).construct(get('MovieApiKey'), get('MovieApiBaseUrl'), get('MovieApiBaseParams'), get('MovieApiParams')),
    MovieService: object(MovieService).construct(get('MovieApi')),
    AnswerService: object(AnswerService).construct(get('MovieService')),
  });

  return container;
};
