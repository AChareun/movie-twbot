import requestAMovie from '../api/get-data';
import getStoredMovie from '../fallback/get-movie';

const getMovieData = async (searchParams) => {
  try {
    const movieData = await requestAMovie(searchParams);
    const isAPISource = true;
    return [movieData, isAPISource];
    
  } catch (error) {
    const fallBackMovie = getStoredMovie();
    const isAPISource = false;
    return [fallBackMovie, isAPISource]
  }
}

export default getMovieData;
