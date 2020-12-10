import movies from './fallback-movies';

const getFallbackMovie = () => {
    const movieData = movies[Math.floor(Math.random() * movies.length - 1)];

    return movieData;
};

export default getFallbackMovie;
