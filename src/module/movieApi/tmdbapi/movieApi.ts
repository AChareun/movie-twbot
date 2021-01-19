import { AbstractMovieApi } from '../abstractMovieApi';
import { ParameterService } from '../../parameter/parameterService';
import { keyValueToQuery } from '../../../utils/keyValueMapper';
import { apiParams } from './params';

export class MovieApi extends AbstractMovieApi {

    API_KEY: string;
    BASE_URL: string;
    BASE_PARAMS: string;
    API_PARAMS: Array<Object>;
    parameterService: ParameterService;
    params: string;

    constructor(apiKey: string, parameterService: ParameterService) {
        super();
        this.API_KEY = apiKey;
        this.BASE_URL = 'https://api.themoviedb.org/3';
        this.BASE_PARAMS = '&language=es-ES&include_adult=false&include_video=false';
        this.API_PARAMS = apiParams;
        this.parameterService = parameterService;
    }

    private constructUrl(page: number, id: number | undefined): string {
        const { BASE_URL, API_KEY, BASE_PARAMS, params } = this;

        if (id) {
            const URL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
            return URL;
        }

        const PAGE = `&page=${page}`;
        const URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&${params + PAGE + BASE_PARAMS}`;

        return URL;
    }

    async getMovieData(request: Array<Array<string>>, page: number = 1, id?: number): Promise<JSON> {
        const validatedParams = this.parameterService.validateParams(request, this.API_PARAMS);
        this.params = keyValueToQuery(validatedParams);

        const urlToFetch = this.constructUrl(page, id);

        const fetchedData = await fetch(urlToFetch).then((res: any) => res.json());

        if (fetchedData.total_pages) {
            const response = { totalPages: fetchedData.totalPages, ...fetchedData };
            delete response.data.total_pages;

            return response;
        }

        return fetchedData;
    }
};
