import requestAMovie from '../api/get-data';
import getStoredMovie from '../fallback/get-movie';
import mapMovie from "../mapper/movie";

const getMovieData = async (searchParams = '') => {
  try {
    const movieData = await requestAMovie(searchParams);
    const newMovie = mapMovie(movieData)
    const isAPISource = true;
    return [newMovie, isAPISource];
    
  } catch (error) {
    const movieData = getStoredMovie();
    const fallbackMovie = mapMovie(movieData);
    const isAPISource = false;
    return [fallbackMovie, isAPISource]
  }
}

export default getMovieData;
