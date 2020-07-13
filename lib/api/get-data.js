"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_KEY = `api_key=${_config.TMDBKEYS.API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3/discover/movie?";

const requestMovieList = async (page = 1) => {
  const MOVIE_LIST = await (0, _nodeFetch.default)(`${BASE_URL}${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`).then(res => res.json());
  return MOVIE_LIST;
};

const requestARandomMovie = async () => {
  const TOTAL_PAGES = await requestMovieList().then(res => res.total_pages);
  const MOVIE_LIST = await requestMovieList(Math.floor(Math.random() * TOTAL_PAGES));
  const RANDOM_MOVIE = MOVIE_LIST.results[Math.floor(Math.random() * MOVIE_LIST.results.length)];
  const movieData = await (0, _nodeFetch.default)(`https://api.themoviedb.org/3/movie/${RANDOM_MOVIE.id}?${API_KEY}&language=en-US`).then(res => res.json());
  console.log(movieData);
  return movieData;
};

var _default = requestARandomMovie;
exports.default = _default;