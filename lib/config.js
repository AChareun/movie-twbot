"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TMDBKEYS = exports.TWKEYS = exports.TWHANDLE = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  TWHANDLE
} = process.env;
exports.TWHANDLE = TWHANDLE;
const TWKEYS = {
  consumer_key: process.env.API_CONSUMER_KEY,
  consumer_secret: process.env.API_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET
};
exports.TWKEYS = TWKEYS;
const TMDBKEYS = {
  API_KEY: process.env.API_KEY,
  READ_TOKEN: process.env.READ_TOKEN
};
exports.TMDBKEYS = TMDBKEYS;