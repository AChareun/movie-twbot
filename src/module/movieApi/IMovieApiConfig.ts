import { IApiParameter } from "../parameter/IApiParameter";

export interface IMovieApiConfig {
    apiKey: string | null;
    baseUrl: string;
    baseParams: string | null;
    apiParams: Array<IApiParameter>;
}
