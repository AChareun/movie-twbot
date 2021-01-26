import apiParams from '../../data/tmdbApiParams';
import { IMovieApiConfig } from '../module/movieApi/IMovieApiConfig';

export const TMDBKEYS = {
    API_KEY: process.env.API_KEY,
    READ_TOKEN: process.env.READ_TOKEN,
};

export const TMDBConfig: IMovieApiConfig = {
    apiKey: TMDBKEYS.API_KEY || null,
    apiParams: apiParams,
    baseUrl: 'https://api.themoviedb.org/3',
    baseParams: '&language=es-ES&include_adult=false&include_video=false' || null,
};
