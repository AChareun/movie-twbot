"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _movie = _interopRequireDefault(require("../entities/movie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapMovie = movieData => {
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
  return new _movie.default(id, imdb_id, title, original_title, overview, original_language, genres.map(genre => genre.name), runtime, release_date);
};

var _default = mapMovie;
exports.default = _default;