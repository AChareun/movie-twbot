"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Movie {
  constructor(args) {
    this.id = args.id;
    this.imdb_id = args.imdb_id;
    this.title = args.title;
    this.original_title = args.original_title;
    this.overview = args.overview;
    this.original_language = args.original_language;
    this.genres = args.genres;
    this.runtime = args.runtime;
    this.release_date = new Date(args.release_date);
  }

}

var _default = Movie;
exports.default = _default;