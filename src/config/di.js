const {
  default: DIContainer, object, get,
} = require('rsdi');
const MovieService = require('../module/movie/service/movieService');
const AnswerService = require('../module/answer/service/answerService');
const TMDBMovieApi = require('../module/movie/api/tmdbapi/tmdbMovieApi');
const apiParams = require('../module/movie/api/tmdbapi/params.json');

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    TMDBParams: apiParams,
    TMDBBaseUrl: 'https://api.themoviedb.org/3',
    TMDBBaseParams: '&language=es-ES&include_adult=false&include_video=false',
    TMDBKey: process.env.API_KEY,
    TMDBApi: object(TMDBMovieApi).construct(get('TMDBKey'), get('TMDBBaseUrl'), get('TMDBBaseParams'), get('TMDBParams')),
    MovieService: object(MovieService).construct(get('TMDBApi')),
    AnswerService: object(AnswerService).construct(get('MovieService')),
  });

  return container;
};
