"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genres = _interopRequireDefault(require("./genres"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const params = [{
  id: 1,
  param: 'gen',
  format: "with_genres="
}, {
  id: 2,
  param: 'estreno',
  format: 'year='
}, {
  id: 3,
  param: 'idioma',
  format: "with_original_language="
}];
var _default = params;
exports.default = _default;