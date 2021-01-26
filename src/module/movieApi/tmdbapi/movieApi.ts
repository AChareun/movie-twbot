import { AbstractMovieApi } from '../abstractMovieApi';
import { ParameterService } from '../../parameter/parameterService';
import { keyValueToQuery } from '../../../utils/keyValueMapper';
import { IApiParameter } from '../../parameter/IApiParameter';
import { IMovieApiConfig } from '../IMovieApiConfig';

export class MovieApi extends AbstractMovieApi {

    API_KEY: string | null;
    BASE_URL: string;
    BASE_PARAMS: string | null;
    API_PARAMS: Array<IApiParameter>;
    parameterService: ParameterService;
    params: string;

    constructor(apiConfig: IMovieApiConfig, parameterService: ParameterService) {
        super();
        this.API_KEY = apiConfig.apiKey;
        this.BASE_URL = apiConfig.baseUrl;
        this.BASE_PARAMS = apiConfig.baseParams;
        this.API_PARAMS = apiConfig.apiParams;
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
