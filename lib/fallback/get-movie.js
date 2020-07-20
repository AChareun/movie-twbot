"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fallbackMovies = _interopRequireDefault(require("./fallback-movies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFallbackMovie = () => {
  const movieData = _fallbackMovies.default[Math.floor(Math.random() * _fallbackMovies.default.length - 1)];

  return movieData;
};

var _default = getFallbackMovie;
exports.default = _default;