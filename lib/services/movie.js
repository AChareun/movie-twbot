"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getData = _interopRequireDefault(require("../api/get-data"));

var _getMovie = _interopRequireDefault(require("../fallback/get-movie"));

var _movie = _interopRequireDefault(require("../mapper/movie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMovieData = async searchParams => {
  try {
    const movieData = await (0, _getData.default)(searchParams);
    const newMovie = (0, _movie.default)(movieData);
    const isAPISource = true;
    return [newMovie, isAPISource];
  } catch (error) {
    const movieData = (0, _getMovie.default)();
    const fallbackMovie = (0, _movie.default)(movieData);
    const isAPISource = false;
    return [fallbackMovie, isAPISource];
  }
};

var _default = getMovieData;
exports.default = _default;