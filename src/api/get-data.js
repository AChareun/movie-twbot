import { TMDBKEYS } from "../config";
import request from "request";

const API_KEY = `api_key=${TMDBKEYS.API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3/discover/movie?";

const requestMovieList = () => {
  request(
    `${BASE_URL}${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`,
    (err, res, body) => {
      if (!err) {
        const data = JSON.parse(body)
        console.log(data.results[0].genre_ids);
      } else {
        console.error(err);
      }
    }
  );
};

requestMovieList();
