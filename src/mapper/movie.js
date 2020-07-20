import Movie from "../entities/movie";

const mapMovie = (movieData) => {
  const {
    id,
    imdb_id,
    title,
    original_title,
    overview,
    original_language,
    genres,
    runtime,
    release_date
  } = movieData;

  return new Movie(
    id,
    imdb_id,
    title,
    original_title,
    overview,
    original_language,
    genres.map(genre => genre.name),
    runtime,
    release_date
  )
}

export default mapMovie;
