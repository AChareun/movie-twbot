export class Movie {
    id: number;
    imdbId: string;
    title: string;
    originalTitle: string;
    overview: string;
    originalLanguage: string;
    genres: Array<string>;
    runtime: number;
    releaseDate: number;

    constructor(
        id: number,
        imdbId: string,
        title: string,
        originalTitle: string,
        overview: string,
        originalLanguage: string,
        genres: Array<string>,
        runtime: number,
        releaseDate: number
    ) {
        this.id = id;
        this.imdbId = imdbId;
        this.title = title;
        this.originalTitle = originalTitle;
        this.overview = overview;
        this.originalLanguage = originalLanguage;
        this.genres = genres;
        this.runtime = runtime;
        this.releaseDate = releaseDate;
    }
}
