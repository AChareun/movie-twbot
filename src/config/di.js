const { default: DIContainer, object, get } = require('rsdi');

const MovieService = require('../module/movie/service/movieService');
const AnswerService = require('../module/answer/service/answerService');
const MovieApi = require('../module/movieApi/tmdbapi/movieApi');
const ParameterService = require('../module/parameter/parameterService');

module.exports = function configureDI() {
    const container = new DIContainer();
    container.addDefinitions({
        MovieApiKey: process.env.API_KEY,
        MovieApi: object(MovieApi).construct(get('MovieApiKey'), get('ParameterService')),
        MovieService: object(MovieService).construct(get('MovieApi')),
        AnswerService: object(AnswerService).construct(get('MovieService')),
        ParameterService: object(ParameterService).construct(),
    });

    return container;
};
