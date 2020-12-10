module.exports = class Movie {
    constructor(
        id,
        imdbId,
        title,
        originalTitle,
        overview,
        originalLanguage,
        genres,
        runtime,
        releaseDate
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
};
