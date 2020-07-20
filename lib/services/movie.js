"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getData = _interopRequireDefault(require("../api/get-data"));

var _getMovie = _interopRequireDefault(require("../fallback/get-movie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMovieData = async searchParams => {
  try {
    const movieData = await (0, _getData.default)(searchParams);
    const isAPISource = true;
    return [movieData, isAPISource];
  } catch (error) {
    const fallBackMovie = (0, _getMovie.default)();
    const isAPISource = false;
    return [fallBackMovie, isAPISource];
  }
};

var _default = getMovieData;
exports.default = _default;