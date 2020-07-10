"use strict";

var _config = require("../config");

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_KEY = `api_key=${_config.TMDBKEYS.API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3/discover/movie?";

const requestMovieList = () => {
  (0, _request.default)(`${BASE_URL}${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`, (err, res, body) => {
    if (!err) {
      const data = JSON.parse(body);
      console.log(data.results[0].genre_ids);
    } else {
      console.error(err);
    }
  });
};

requestMovieList();