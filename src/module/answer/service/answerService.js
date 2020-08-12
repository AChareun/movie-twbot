/**
 * @typedef {import('../../movie/service/movieService')} MovieService
 * @typedef {import('../../movie/entity/movie')} Movie
 */

/**
 * @param {Movie} movieData
 * @param {boolean} isAPISource
 * @returns {string}
 */
function writeAnswer(movieData, isAPISource = true) {
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

module.exports = class AnswerService {
  /**
   * @param {MovieService} movieService
   */
  constructor(movieService) {
    this.movieService = movieService;
  }

  /**
   *@returns {string} Message with movie information
   */
  async getAnswer() {
    const movie = await this.movieService.getMovie();
    const answer = writeAnswer(movie);

    return answer;
  }
};
