"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genres = _interopRequireDefault(require("./genres"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getParams = tweetText => {
  const tweetParams = tweetText.split("/").map(param => param.split(":"));

  try {
    const FORMATED_PARAMS = tweetParams.map(param => formatParams(param));
    return FORMATED_PARAMS.join("&");
  } catch (error) {
    throw error;
  }
};

const formatParams = param => {
  const newParam = param;

  switch (newParam[0]) {
    case "gen":
      newParam[0] = "with_genres=";
      newParam[1] = getGenreId(newParam[1]);
      break;

    case "estreno":
      newParam[0] = "year=";
      break;

    case "idioma":
      newParam[0] = "with_original_language=";
      break;

    default:
      throw new Error('invalid parameter');
  }

  return newParam.join("");
};

const getGenreId = param => {
  const genre = param.toLowerCase();

  const genreIndex = _genres.default.findIndex(gen => gen.name === genre);

  const genreID = _genres.default[genreIndex].id;
  return genreID;
};

var _default = getParams;
exports.default = _default;