export abstract class AbstractMovieApi {
    abstract getMovieData(request: Array<Array<any>>, page?: number, id?: number): Promise<JSON>;
};
