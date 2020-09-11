/* eslint-disable class-methods-use-this */
/**
 * @typedef {import('../../movie/service/movieService')} MovieService
 * @typedef {import('../../movie/entity/movie')} Movie
 */

module.exports = class AnswerService {
  /**
   * @param {MovieService} movieService
   */
  constructor(movieService) {
    this.movieService = movieService;
  }

  /**
 * @param {Movie} movieData
 * @param {boolean} isAPISource specifies if data comes from an api or the fallback
 * @returns {string}
 */
  writeAnswer(movieData, isAPISource = true) {
    if (!isAPISource) {
      const answerText = `Hubo un problema con la API, pero igual te dejo una recomendación 😊
'${movieData.title}'.
Estreno de ${movieData.releaseDate}.
Duración: ${movieData.runtime}.`;

      return answerText;
    }
    const answerText = `Hey, acá va una peli para vos 😊
'${movieData.title} (${movieData.originalTitle})'.
Estreno del ${movieData.releaseDate}.
Duración: ${movieData.runtime}.`;

    return answerText;
  }

  /**
   * @param {string} request from the Twitter Bot
   * @returns {string} text with movie information
   */
  async getAnswer(request) {
    const movie = await this.movieService.getMovie(request);
    const answer = this.writeAnswer(movie);

    return answer;
  }
};
