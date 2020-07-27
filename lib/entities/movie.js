"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable camelcase */
class Movie {
  constructor(id, imdb_id, title, original_title, overview, original_language, genres, runtime, release_date) {
    this.id = id;
    this.imdb_id = imdb_id;
    this.title = title;
    this.original_title = original_title;
    this.overview = overview;
    this.original_language = original_language;
    this.genres = genres;
    this.runtime = runtime;
    this.release_date = new Date(release_date).getFullYear();
  }

}

var _default = Movie;
exports.default = _default;