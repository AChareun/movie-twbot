"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genres = _interopRequireDefault(require("./genres"));

var _params = _interopRequireDefault(require("./params"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getGenreId = param => {
  const genre = param.toLowerCase();

  const genreIndex = _genres.default.findIndex(gen => gen.name === genre);

  if (genreIndex === -1) throw new Error('invalid genre');
  const genreID = _genres.default[genreIndex].id;
  return genreID;
};

const formatParams = param => {
  const newParam = param;

  const paramIndex = _params.default.findIndex(item => item.param === newParam[0]);

  if (paramIndex === -1) throw new Error('invalid parameter');

  if (newParam[0] === 'gen') {
    try {
      newParam[1] = getGenreId(newParam[1]);
    } catch (error) {
      throw new Error('invalid genre');
    }
  }

  newParam[0] = _params.default[paramIndex].format;
  return newParam.join('');
};

const getParams = tweetText => {
  const tweetParams = tweetText.split('/').map(param => param.split(':'));

  try {
    const FORMATED_PARAMS = tweetParams.map(param => formatParams(param));
    return FORMATED_PARAMS.join('&');
  } catch (error) {
    throw new Error('invalid parameter');
  }
};

var _default = getParams;
exports.default = _default;