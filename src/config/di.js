const {
  default: DIContainer, object, get,
} = require('rsdi');
const MovieService = require('../module/movie/service/movieService');
const AnswerService = require('../module/answer/service/answerService');
const ParamService = require('../module/param/service/paramService');
const MovieApi = require('../module/api/movieApi');
const apiParams = require('../module/api/params.json');
const apiGenres = require('../module/api/genres.json');

module.exports = function configureDI(request) {
  const container = new DIContainer();
  container.addDefinitions({
    TMDBParams: apiParams,
    TMDBGenres: apiGenres,
    TMDBBaseUrl: 'https://api.themoviedb.org/3',
    TMDBBaseParams: '&language=es-ES&include_adult=false&include_video=false',
    TMDBKey: process.env.API_KEY,
    TMDBApi: object(MovieApi).construct(get('TMDBBaseUrl'), get('TMDBKey'), get('TMDBBaseParams'), get('TMDBParams'), get('TMDBGenres')),
    ParamService: object(ParamService).construct(request, get('TMDBApi')),
    MovieService: object(MovieService).construct(get('ParamService'), get('TMDBApi')),
    AnswerService: object(AnswerService).construct(get('MovieService')),
  });

  return container;
};
