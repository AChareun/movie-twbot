const Movie = require('../entity/movie');

module.exports = function mapMovie(movieData) {
    const {
        id,
        imdb_id: imdbId,
        title,
        original_title: originalTitle,
        overview,
        original_language: originalLanguage,
        genres,
        runtime,
        release_date: releaseDate,
    } = movieData;

    return new Movie(
        id,
        imdbId,
        title,
        originalTitle,
        overview,
        originalLanguage,
        genres.map((genre) => genre.name),
        runtime,
        new Date(releaseDate).getFullYear()
    );
};
