import { AbstractMovieApi } from '../../movieApi/abstractMovieApi';
import { Movie } from '../entity/movie';
import {mapMovie} from '../mapper/movieMapper';
import { requestToKeyValuePair } from '../../../utils/keyValueMapper';

export class MovieService {
    /**
     * @param {AbstractMovieApi} movieApi
     * @param {Array<Object>} fallbackMovies
     */

    movieApi: AbstractMovieApi;
    fallbackMovies: Array<Object>;

    constructor(movieApi: AbstractMovieApi, fallbackMovies: Array<Object>) {
        this.movieApi = movieApi;
        this.fallbackMovies = fallbackMovies;
    }

    async getMovie(request: string): Promise<Movie> {
        const mappedRequest = requestToKeyValuePair(request);
        const { totalPages }: any = await this.movieApi.getMovieData(mappedRequest, 1);

        const randomPage = Math.floor(Math.random() * totalPages + 1);
        const movieList: any = await this.movieApi.getMovieData(mappedRequest, randomPage);

        const randomMovie = movieList.results[Math.floor(Math.random() * movieList.results.length)];
        const movieData = await this.movieApi.getMovieData(mappedRequest, undefined, randomMovie.id);

        const movie = mapMovie(movieData);
        return movie;
    }

    getFallbackMovie(): Object {
        const movies = this.fallbackMovies;
        const movieData = movies[Math.floor(Math.random() * movies.length - 1)];

        return movieData;
    }
};
