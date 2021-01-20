import { default as DIContainer, object, get } from 'rsdi';

import { MovieService } from '../module/movie/service/movieService';
import { AnswerService } from '../module/answer/service/answerService';
import { MovieApi } from '../module/movieApi/tmdbapi/movieApi';
import { TMDBConfig } from './apiConfig';
import { ParameterService } from '../module/parameter/parameterService';

export function configureDI() {
    const container = new DIContainer();
    container.addDefinitions({
        MovieApiConfig: TMDBConfig,
        MovieApi: object(MovieApi).construct(get('MovieApiConfig'), get('ParameterService')),
        MovieService: object(MovieService).construct(get('MovieApi')),
        AnswerService: object(AnswerService).construct(get('MovieService')),
        ParameterService: object(ParameterService).construct(),
    });

    return container;
}
